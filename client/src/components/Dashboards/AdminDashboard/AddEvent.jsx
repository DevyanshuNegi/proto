import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "./Input";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
function AddEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizedBy, setOrganizedBy] = useState("");
  const [loader, setLoader] = useState(false);
  const [responsedata, setResponsedata] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:8000/api/v1/",
        withCredentials: true,
      });
      // let name;
      axiosInstance
        .get("http://localhost:8000/api/v1/organisation/current-org", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          setResponsedata(response.data.data);
          setOrganizedBy(response.data.data.name);
          // console.log("Hii");
          // console.log(responsedata);
          // responsedata=response.data.data.user;
        })
        .catch((error) => {
          console.log("Error in not getting cookiee");
          console.log(error);
          navigate("/auth/ngo-login");
        });
    };
  }, []);

  let addEvent = async (event) => {
    event.preventDefault();
    setLoader(true);
    const data = {
      name: name,
      organizedBy,
      description,
      date: date,
      location,
      time: time,
    };
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8000/api/v1/",
      withCredentials: true,
    });
    axiosInstance
      .post("http://localhost:8000/api/v1/organisation/add-event", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log("response", response);
        // localStorage.setItem("token", response.data.data.accessToken);
        // localStorage.setItem("admin", JSON.stringify(response.data.data.organisation));
        // console.log("response.data.data.user", response.data.data.user);
        // console.log("response.data.data.token", response.data.data.token);

        toast.success("Event published successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/admin-dashboard");
      })
      .catch((error) => {
        console.log("error", error);
        const statusCode = error.response.status;
        let errorMessage = error.response.data.message;

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="flex flex-col-reverse items-center  w-full h-full mt-12">
      <div className="w-full rounded-lg md:mt-0 sm:max-w-md  mb-16 bg-gray-800 border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
            Add a new event
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={addEvent}>
            <Input
              field={{
                name: "name",
                placeholder: "Enter name",
                req: true,
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "description",
                placeholder: "Enter description",
                req: true,
                type: "text",
                value: description,
                onChange: (e) => setDescription(e.target.value),
              }}
            />
            <Input
              field={{
                name: "date",
                placeholder: "Enter date",
                req: true,
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
              }}
            />
            <Input
              field={{
                name: "time",
                placeholder: "Enter time",
                req: true,
                type: "time",
                value: time,
                onChange: (e) => setTime(e.target.value),
              }}
            />
            <Input
              field={{
                name: "location",
                placeholder: "Enter location",
                req: true,
                type: "text",
                value: location,
                onChange: (e) => setLocation(e.target.value),
              }}
            />
            {/* <button type="submit" disabled={loader}>Add Event</button> */}
            <button
              type="submit"
              className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 focus:ring-blue-800"
            >
              {loader ? (
                <>
                  <Loader /> Verifying...
                </>
              ) : (
                <span>Add Event</span>
              )}
            </button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
