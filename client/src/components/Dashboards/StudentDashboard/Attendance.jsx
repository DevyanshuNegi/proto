import React from "react";

// const events = [
//     {
//         id: 1,
//         name: "Tech Conference 2024",
//         date: "December 15, 2024",
//         description: "A premier event for tech enthusiasts. Join industry leaders and innovators for a day of insightful talks and networking. Discover the latest trends and technologies shaping the future.",
//         organization: "Tech World",
//     },
//     {
//         id: 2,
//         name: "Startup Pitch Fest",
//         date: "January 10, 2025",
//         description: "Pitch your ideas to top investors. This event provides a platform for startups to showcase their innovations and secure funding. Gain valuable feedback and make connections with potential investors.",
//         organization: "Innovators Inc.",
//     },
//     {
//         id: 3,
//         name: "AI Workshop",
//         date: "February 8, 2025",
//         description: "Hands-on workshop on building AI solutions. Learn from experts in the field and get practical experience with AI tools and techniques. Perfect for developers and tech enthusiasts looking to enhance their skills.",
//         organization: "Future Minds",
//     },
// ];

// const EventCard = ({ event }) => (
//     <div className="bg-black rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-150 transform hover:-translate-y-0.5 hover:scale-102 border border-blue-200">
//         <div className="flex justify-between">
//             <h3 className="text-2xl font-extrabold text-blue-600">{event.name}</h3>
//             <p className="text-md font-semibold text-gray-300 mt-1">{event.date}</p>
//         </div>
//         <p className="text-gray-300 mt-4 text-lg font-semibold mx-3">{event.description}</p>
//         <p className="text-sm font-medium text-blue-500 mt-4">{event.organization}</p>
//     </div>
// );

const events = [
  {
    id: 1,
    name: "Tech Conference 2024",
    date: "December 15, 2024",
    description:
      "A premier event for tech enthusiasts. Join industry leaders and innovators for a day of insightful talks and networking. Discover the latest trends and technologies shaping the future.",
    organization: "Tech World",
  },
  {
    id: 2,
    name: "Startup Pitch Fest",
    date: "January 10, 2025",
    description:
      "Pitch your ideas to top investors. This event provides a platform for startups to showcase their innovations and secure funding. Gain valuable feedback and make connections with potential investors.",
    organization: "Innovators Inc.",
  },
  {
    id: 3,
    name: "AI Workshop",
    date: "February 8, 2025",
    description:
      "Hands-on workshop on building AI solutions. Learn from experts in the field and get practical experience with AI tools and techniques. Perfect for developers and tech enthusiasts looking to enhance their skills.",
    organization: "Future Minds",
  },
  {
    id: 4,
    name: "Community Clean-Up Drive",
    date: "September 20, 2023",
    description:
      "A community event focused on cleaning up local parks and streets. Volunteers gathered to make the neighborhood cleaner and greener. It was a great opportunity to meet neighbors and work together for a common cause.",
    organization: "Green Earth",
  },
  {
    id: 5,
    name: "Food Donation Camp",
    date: "August 15, 2023",
    description:
      "An event to collect and distribute food to the needy. Community members donated non-perishable food items, which were then distributed to local shelters. The event helped raise awareness about food insecurity.",
    organization: "Helping Hands",
  },
];

// const EventCard = ({ event }) => (
//   <div className="relative bg-gray-800 rounded-lg shadow-md px-6 py-4 hover:shadow-xl transition-all duration-300">
//     <div className="absolute top-0 left-[-30px] w-2 h-2 bg-blue-500 rounded-full"></div>
//     <h3 className="text-lg font-bold text-blue-400">{event.name}</h3>
//     <p className="text-sm text-gray-400 mt-1">{event.date}</p>
//     <p className="text-gray-300 mt-3 text-sm">{event.description}</p>
//     <p className="text-blue-400 mt-4 italic text-sm">
//       By: {event.organization}
//     </p>
//   </div>
// );

// const Attendance = () => (
//   <div className="bg-gray-900 min-h-screen py-20">
//     <div className="max-w-5xl mx-auto px-4">
//       <h1 className="text-5xl font-bold text-white text-center mb-12">
//         Past Events
//       </h1>
//       <div className="relative">
//         <div className="absolute left-[15px] top-0 bottom-0 w-1 bg-blue-500"></div>
//         <div className="space-y-10 pl-10">
//           {events.map((event) => (
//             <EventCard key={event.id} event={event} />
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );

const EventCard = ({ event }) => (
  <div
    className="bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:scale-105"
    style={{
      perspective: "1000px",
      transformStyle: "preserve-3d",
    }}
  >
    <h3 className="text-2xl font-extrabold text-blue-400">{event.name}</h3>
    <p className="text-sm text-gray-400 mt-2">{event.date}</p>
    <p className="text-gray-300 mt-4 text-sm">{event.description}</p>
    <p className="text-blue-500 mt-6 italic text-sm">
      By: {event.organization}
    </p>
  </div>
);

const Attendance = () => (
  <div className="bg-gray-900 min-h-screen py-20">
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-5xl font-bold text-white text-center mb-10">
        Past Events
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        onMouseMove={(e) => {
          const cards = document.querySelectorAll(".hover:scale-105");
          cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `rotateY(${x / 50}deg) rotateX(${-y / 50}deg)`;
          });
        }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  </div>
);

export default Attendance;
