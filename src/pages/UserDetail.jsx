
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getUser } from "../utils/authHelper";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const currentUser = getUser();

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log("TOKEN USED:", token);
        const res = await axios.get(
          `https://harleen-design-backend.onrender.com/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        );
        setUser(res.data.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || "User not found");
      }
    };
    load();
  }, [id]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        User Details
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center">

        <img
          className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-md mb-4"
          src={
            user.profile_image
              ? `https://harleen-design-backend.onrender.com${user.profile_image}`
              : "https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg"
          }
          alt="avatar"
        />

        <h3 className="text-2xl font-semibold mt-2">{user.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{user.email}</p>

        <div className="mt-4 space-y-1 text-gray-700">
          <p>{user.phone}</p>
          <p>{user.address}</p>
          <p>
            {user.city}, {user.state}, {user.country} - {user.pincode}
          </p>
        </div>

        {(currentUser?.role === "admin" || currentUser?._id === user._id) && (
          <Link to={`/users/${id}/edit`} className="w-full">
            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
