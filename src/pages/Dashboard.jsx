
import { Link } from "react-router-dom";
import { getUser } from "../utils/authHelper";

const Dashboard = () => {
    const user = getUser();

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

            <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800">
                    Welcome, {user?.name || "User"} 👋
                </h3>

                <p className="text-gray-600 mt-1 text-sm">Role: {user?.role}</p>

                <div className="mt-5">
                    <Link to="/users">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow">
                            Manage Users
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Quick Info</h4>

                <p className="text-gray-600 text-sm leading-relaxed">
                    Use the Users page to view, search, edit & delete users.
                    <span className="font-medium text-gray-700">Admin users</span> have additional privileges for restricted actions.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
