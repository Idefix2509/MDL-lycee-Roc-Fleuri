"use client";

import { useEffect, useState } from "react";

type Event = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  maxParticipants: number;
  registrations: any[];
};

export default function ActualitesPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Chargement des événements...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Actualités MDL
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {events.map((event) => {
          const validated = event.registrations.filter(
            (r) => r.status === "VALIDE"
          ).length;

          const remaining =
            event.maxParticipants - validated;

          return (
            <div
              key={event.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  className="h-40 w-full object-cover rounded"
                />
              )}

              <h2 className="text-lg font-semibold mt-2">
                {event.title}
              </h2>

              <p className="text-sm text-gray-600">
                {event.description}
              </p>

              <div className="mt-2 text-sm">
                💰 Prix : {event.price}€
              </div>

              <div className="text-sm">
                👥 Places restantes : {remaining}
              </div>

              <button className="mt-3 w-full bg-black text-white py-2 rounded">
                S’inscrire
              <button
  className="mt-3 w-full bg-black text-white py-2 rounded"
  onClick={async () => {
    try {
      const res = await fetch(
        `/api/events/${event.id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1, // TEMPORAIRE (on branchera Clerk après)
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
      } else {
        alert("Inscription réussie !");
      }
    } catch (err) {
      alert("Erreur réseau");
    }
  }}
>
  S’inscrire
</button>
            </div>
          );
        })}

      </div>
    </div>
  );
}
