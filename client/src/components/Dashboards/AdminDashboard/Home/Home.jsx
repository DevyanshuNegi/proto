import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [adminData, setAdminData] = useState({
    name: "Admin",
    email: "",
    description: "",
    rating: 0,
    started_at: "",
    docs: [],
    members: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/organisation/current-org",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );
        setAdminData(response.data.data);
      } catch (error) {
        console.error("Error fetching admin data", error);
        toast.error("Failed to fetch admin data. Redirecting to login.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth/ngo-login");
      }
    };

    fetchAdminData();
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start pt-20 px-10 sm:px-14 bg-gradient-to-b from-[#0e1c33] to-[#1a2540] text-white">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 text-gradient leading-tight">
        Welcome, {adminData.name}!
      </h1>
      <p className="text-xl md:text-2xl text-center mb-14 max-w-4xl text-gray-300 opacity-80">
        {adminData.description ||
          "Effortlessly manage your organization's activities with a premium admin dashboard."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {/* Admin Details */}
        <div className="bg-[#1F1F1F] rounded-2xl shadow-xl p-8 lux-card hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gold">
            Organization Details
          </h2>
          <p className="text-lg mb-3">
            <strong>Name:</strong> {adminData.name}
          </p>
          <p className="text-lg mb-3">
            <strong>Email:</strong> {adminData.email}
          </p>
          <p className="text-lg mb-3">
            <strong>Rating:</strong> {adminData.rating} ⭐
          </p>
          <p className="text-lg">
            <strong>Founded On:</strong>{" "}
            {new Date(adminData.started_at).toLocaleDateString()}
          </p>
        </div>

        {/* Members Section */}
        <div className="bg-[#1F1F1F] rounded-2xl shadow-xl p-8 lux-card hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-silver">Members</h2>
          {adminData.members.length ? (
            <ul className="space-y-4">
              {adminData.members.map((member, index) => (
                <li key={index} className="text-lg text-gray-200">
                  {member}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No members found.</p>
          )}
        </div>

        {/* Documents Section */}
        <div className="bg-[#1F1F1F] rounded-2xl shadow-xl p-8 lux-card hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-diamond">
            Documents
          </h2>
          {adminData.docs.length ? (
            <ul className="space-y-4">
              {adminData.docs.map((doc, index) => (
                <li key={index}>
                  <a
                    href={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline transition-all"
                  >
                    View Document {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No documents uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-lg text-gray-500 opacity-70">
        Need help? Contact us at{" "}
        <a
          href={`mailto:${adminData.email}`}
          className="text-blue-400 hover:underline transition-all"
        >
          {adminData.email}
        </a>
      </footer>
    </div>
  );
}

export default Home;
