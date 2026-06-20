"use client";

import { useEffect, useState } from "react";

type Registration = {

  id: number;

  status: string;

  event: {

    id: number;

    title: string;

    eventDate: string;

  };

};

export default function MesInscriptionsPage() {

  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadRegistrations() {

    const response = await fetch("/api/me/registrations");

    const data = await response.json();

    setRegistrations(data);

    setLoading(false);

  }

  useEffect(() => {

    loadRegistrations();

  }, []);

  async function cancelRegistration(eventId: number) {

    const response = await fetch(

      `/api/events/${eventId}/cancel`,

      {

        method: "POST"

      }

    );

    if (response.ok) {

      loadRegistrations();

    }

    else {

      alert("Impossible d'annuler l'inscription");

    }

  }

  if (loading) {

    return <div className="p-6">Chargement...</div>;

  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">

        Mes inscriptions

      </h1>

      <div className="space-y-4">

        {

          registrations.map((registration) => (

            <div

              key={registration.id}

              className="border rounded-xl p-4 bg-white shadow"

            >

              <div className="font-bold">

                {registration.event.title}

              </div>

              <div>

                {new Date(

                  registration.event.eventDate

                ).toLocaleString("fr-FR")}

              </div>

              <div>

                Statut :

                {" "}

                {registration.status}

              </div>

              <button

                className="mt-3 bg-red-600 text-white px-4 py-2 rounded"

                onClick={() =>

                  cancelRegistration(

                    registration.event.id

                  )

                }

              >

                Annuler

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

}
