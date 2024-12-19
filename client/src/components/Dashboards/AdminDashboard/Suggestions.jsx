import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";
import axios from "axios";

const AllEvents = () => {
  // const [loading, setLoading] = useState(false);
  // const [events, setEvents] = useState([{}]);
  // useEffect(() => {
  //   return () => {
  //     axios
  //       .get("http://localhost:8000/api/v1/events/getUpcomingEvents")
  //       .then((response) => {
  //         setEvents(response.data.data);
  //       });
  //   };
  // }, []);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    return () => {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:8000/api/v1/",
        withCredentials: true,
      });
      // let name;
      axiosInstance
        .get("http://localhost:8000/api/v1/organisation/get-all-events")
        .then((response) => {
          setEvents(response.data.data);
        });
    };
  }, []);
  return (
    <div className="w-full  p-6 rounded-xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 drop-shadow-2xl overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-700 shadow-md hover:shadow-xl transition-all duration-200"
          >
            <div className="flex flex-col items-start">
              <div className="text-white mt-2">
                <p className="text-xl text-red-300 font-bold">{event.name}</p>
                <br />
                <p className="text-xl font-semibold">{event.description}</p>
                <p className="text-sm text-gray-400">{event.eventDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
function Suggestions() {
  // const [events, setEvents] = useState([]);
  // useEffect(() => {
  //   return () => {
  //     axios
  //       .get("http://localhost:8000/api/v1/organisation/getAll-events")
  //       .then((response) => {
  //         setEvents(response.data.data);
  //       });
  //   };
  // }, []);
  return (
    <div className="w-full mt-7 h-full flex flex-col items-center justify-start py-10 bg-gradient-to-br from-gray-800 to-gray-900">
      <h1 className="text-white font-bold text-5xl mb-8">All Events</h1>
      <div className="w-full max-w-6xl px-4">
        <AllEvents />
      </div>
    </div>
  );
}

export default Suggestions;
