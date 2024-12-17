import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PastEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      axios
        .get("http://localhost:8000/api/v1/users/past-events", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          console.log("event data ",response.data);
          // ParticipateEvent(eventId);
          window.location.reload(); // Refresh page to reflect updated status
        })
        .catch((error) => {
          console.error("Error Participating", error);

        });
    };
  }, []);

  

  return (
    <div className="bg-gray-900 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-10">
          Past Events
        </h1>
        {error && (
          <p className="text-red-500 text-center">
            Failed to load events. Please try again later.
          </p>
        )}
        {events.map((event) => (
          <div key={event.id} className="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-2xl font-extrabold text-blue-400">{event.name}</h3>
            <p className="text-sm text-gray-400 mt-2">{event.date}</p>
            <p className="text-gray-300 mt-4 text-sm">{event.description}</p>
            <p className="text-blue-500 mt-6 italic text-sm">
              By: {event.organization}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastEvents;
