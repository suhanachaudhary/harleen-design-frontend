
import { Link, useNavigate } from "react-router-dom";
import { getUser, clearTokens } from "../utils/authHelper";
import { useState } from "react";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [open, setOpen] = useState(false);

    const logout = () => {
        clearTokens();
        navigate("/login");
        toast.error("Logout successfully...")
    };

    return (
        <>

            <Toaster position="bottom-center" reverseOrder={false} toastOptions={{
                style: {
                    background: "rgba(0, 0, 0, 0.65)",
                    color: "#fff",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    padding: "12px 18px",
                    fontSize: "0.95rem",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                },
                success: {
                    iconTheme: {
                        primary: "#b1852e",
                        secondary: "#1a1a1a",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#f87171",
                        secondary: "#1a1a1a",
                    },
                },
            }} />

            <nav className="bg-gray-900 text-white px-4 py-3 shadow-md sticky">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Left Section */}
                    <div className="flex items-center gap-6">
                        <Link
                            to="/dashboard"
                            className="text-2xl font-semibold hover:text-gray-300 transition"
                        >
                            Harveen Designs
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex gap-6">
                            {/* <Link className="hover:text-gray-300 transition text-xl" to="/users">
                            Users
                        </Link> */}
                        </div>
                    </div>

                    {/* Right Section (Auth) */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-gray-300 text-xl">Hi, {user.name}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition text-xl"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="hover:text-gray-300 text-xl transition" to="/login">
                                    Login
                                </Link>
                                <Link
                                    className="hover:text-gray-300 text-xl transition"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="md:hidden mt-3 flex flex-col gap-3 bg-gray-800 p-4 rounded-lg">
                        <Link className="hover:text-gray-300 text-xl" to="/users">
                            Users
                        </Link>

                        {user ? (
                            <>
                                <span className="text-gray-300 text-xl">Hi, {user.name}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition text-xl"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="hover:text-gray-300 text-xl" to="/login">
                                    Login
                                </Link>
                                <Link className="hover:text-gray-300 text-xl" to="/register">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
