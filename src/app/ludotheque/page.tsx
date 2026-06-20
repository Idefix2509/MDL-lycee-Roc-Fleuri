"use client";

import { useEffect, useState } from "react";

type Game = {

  id: number;

  name: string;

  description: string;

  imageUrl?: string;

  status: string;

};

export default function LudothequePage() {

  const [games, setGames] = useState<Game[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch("/api/games")

      .then(res => res.json())

      .then(data => setGames(data));

  }, []);

  const filteredGames = games.filter(

    game =>

      game.name.toLowerCase().includes(

        search.toLowerCase()

      )

  );

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">

        Catalogue de la ludothèque

      </h1>

      <input

        className="border rounded p-2 w-full mb-6"

        placeholder="Rechercher un jeu..."

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

        {

          filteredGames.map((game) => (

            <div

              key={game.id}

              className="bg-white shadow rounded-xl p-4"

            >

              {

                game.imageUrl &&

                <img

                  src={game.imageUrl}

                  className="h-48 w-full object-cover rounded mb-4"

                />

              }

              <div className="font-bold">

                {game.name}

              </div>

              <div className="text-sm text-gray-600 mt-2">

                {game.description}

              </div>

              <div className="mt-4">

                {

                  game.status === "DISPONIBLE" &&

                  <span className="text-green-600">

                    Disponible

                  </span>

                }

                {

                  game.status === "EMPRUNTE" &&

                  <span className="text-orange-500">

                    Emprunté

                  </span>

                }

                {

                  game.status === "EMPRUNTE_FOYER" &&

                  <span className="text-blue-600">

                    Disponible au foyer

                  </span>

                }

                {

                  game.status === "MAINTENANCE" &&

                  <span className="text-red-600">

                    En maintenance

                  </span>

                }

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}
