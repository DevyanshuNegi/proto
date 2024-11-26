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
        id: 4,
        name: "Community Clean-Up Drive",
        date: "September 20, 2023",
        description: "A community event focused on cleaning up local parks and streets. Volunteers gathered to make the neighborhood cleaner and greener. It was a great opportunity to meet neighbors and work together for a common cause.",
        organization: "Green Earth",
    },
    {
        id: 5,
        name: "Food Donation Camp",
        date: "August 15, 2023",
        description: "An event to collect and distribute food to the needy. Community members donated non-perishable food items, which were then distributed to local shelters. The event helped raise awareness about food insecurity.",
        organization: "Helping Hands",
    },
   
    // Add more events here
];

const EventCard = ({ event }) => (
    <div className="bg-black rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-150 transform hover:-translate-y-0.5 hover:scale-102 border border-blue-200">
        <div className="flex justify-between">
            <h3 className="text-2xl font-extrabold text-blue-600">{event.name}</h3>
            <p className="text-md font-semibold text-gray-300 mt-1">{event.date}</p>
        </div>
        <p className="text-gray-300 mt-4 text-lg font-semibold mx-3">{event.description}</p>
        <p className="text-sm font-medium text-blue-500 mt-4">{event.organization}</p>
    </div>
);

const Attendance = () => {
    return (
        <div className="bg-stone-900 min-h-screen py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center">
                <h1 className="text-4xl font-bold text-white mb-6 text-center">Past Events</h1>
                <div className="flex flex-col gap-6">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Attendance;
