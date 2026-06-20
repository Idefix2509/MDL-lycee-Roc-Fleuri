"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {

    fetch("/api/notifications")

      .then(res => res.json())

      .then(setNotifications);

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">

        Notifications

      </h1>

      <div className="space-y-4">

        {

          notifications.map(

            (notification) => (

              <div

                key={notification.id}

                className="bg-white rounded-xl shadow p-4"

              >

                <div className="font-bold">

                  {notification.title}

                </div>

                <div>

                  {notification.message}

                </div>

              </div>

            )

          )

        }

      </div>

    </div>

  );

}
