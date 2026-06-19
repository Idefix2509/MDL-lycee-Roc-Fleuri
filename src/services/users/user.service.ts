import { prisma } from "@/lib/prisma";
import crypto from "crypto";

/**
 * Génère un identifiant unique type jean.dupont
 */
function generateUsername(firstName: string, lastName: string) {
  return (
    firstName.toLowerCase().replace(/\s/g, "") +
    "." +
    lastName.toLowerCase().replace(/\s/g, "")
  );
}

/**
 * Génère un QR Code simple (format texte)
 * utilisé ensuite pour génération image côté API
 */
function generateQrCode(username: string) {
  return `MDL:${username}`;
}

/**
 * Mot de passe provisoire simple
 */
function generateTempPassword() {
  return crypto.randomBytes(4).toString("hex");
}

/**
 * Création d'un utilisateur (ADMIN ONLY)
 */
export async function createUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  role: "ADHERENT" | "ENCADRANT" | "RESPONSABLE_LUDOTHEQUE" | "ADMINISTRATEUR";
  isBenevole?: boolean;
}) {
  const username = generateUsername(data.firstName, data.lastName);
  const tempPassword = generateTempPassword();
  const qrCode = generateQrCode(username);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username,
      password: tempPassword, // sera hashé plus tard
      role: data.role,
      isBenevole: data.isBenevole ?? false,
      qrCode,
      mustChangePassword: true,
    },
  });

  return {
    user,
    tempPassword,
  };
}

/**
 * Récupération utilisateur par ID
 */
export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      loans: true,
      registrations: true,
    },
  });
}

/**
 * Liste des utilisateurs
 */
export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Changer rôle utilisateur
 */
export async function updateUserRole(
  id: number,
  role: "ADHERENT" | "ENCADRANT" | "RESPONSABLE_LUDOTHEQUE" | "ADMINISTRATEUR"
) {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
}

/**
 * Suppression utilisateur (RGPD-safe)
 */
export async function deleteUser(id: number) {
  return prisma.user.delete({
    where: { id },
  });
}

/**
 * Marquer changement de mot de passe effectué
 */
export async function markPasswordChanged(id: number) {
  return prisma.user.update({
    where: { id },
    data: {
      mustChangePassword: false,
    },
  });
}
