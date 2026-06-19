import { prisma } from "@/lib/prisma";
import { EventStatus } from "@/types/event-status";

/**
 * Création d’un événement (ADMIN / RESPONSABLE / ENCADRANT)
 */
export async function createEvent(data: {
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  maxParticipants: number;
  eventDate: Date;
  registrationOpensAt: Date;
  registrationClosesAt: Date;
  createdByUserId?: number;
}) {
  return prisma.event.create({
    data: {
      ...data,
      status: EventStatus.PROCHAINEMENT,
    },
  });
}

/**
 * Récupérer tous les événements
 */
export async function getAllEvents() {
  return prisma.event.findMany({
    orderBy: {
      eventDate: "asc",
    },
    include: {
      registrations: true,
    },
  });
}

/**
 * Récupérer un événement
 */
export async function getEventById(id: number) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      registrations: true,
    },
  });
}

/**
 * Calcul du nombre de places restantes
 */
function getRemainingPlaces(event: any) {
  const validated = event.registrations.filter(
    (r: any) => r.status === "VALIDE"
  ).length;

  return event.maxParticipants - validated;
}

/**
 * Inscription à un événement
 */
export async function registerToEvent(eventId: number, userId: number) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { registrations: true },
  });

  if (!event) {
    throw new Error("Événement introuvable");
  }

  const now = new Date();

  // contrôle des dates (IMPORTANT)
  if (now < event.registrationOpensAt) {
    throw new Error("Les inscriptions ne sont pas encore ouvertes");
  }

  if (now > event.registrationClosesAt) {
    throw new Error("Les inscriptions sont terminées");
  }

  const remaining = getRemainingPlaces(event);

  let status = "PRE_INSCRIT";

  if (remaining <= 0) {
    status = "LISTE_ATTENTE";
  }

  return prisma.eventRegistration.create({
    data: {
      eventId,
      userId,
      status,
    },
  });
}

/**
 * Validation inscription (ADMIN / ENCADRANT)
 */
export async function validateRegistration(registrationId: number) {
  const registration = await prisma.eventRegistration.findUnique({
    where: { id: registrationId },
  });

  if (!registration) {
    throw new Error("Inscription introuvable");
  }

  return prisma.eventRegistration.update({
    where: { id: registrationId },
    data: {
      status: "VALIDE",
      validatedAt: new Date(),
    },
  });
}

/**
 * Refuser une inscription
 */
export async function refuseRegistration(registrationId: number) {
  return prisma.eventRegistration.update({
    where: { id: registrationId },
    data: {
      status: "REFUSE",
    },
  });
}

/**
 * Check-in (présence)
 */
export async function checkInUser(registrationId: number, userId: number) {
  return prisma.eventRegistration.update({
    where: { id: registrationId },
    data: {
      attendedAt: new Date(),
      checkedInByUserId: userId,
    },
  });
}

/**
 * Annulation inscription utilisateur
 */
export async function cancelRegistration(registrationId: number) {
  return prisma.eventRegistration.delete({
    where: { id: registrationId },
  });
}
