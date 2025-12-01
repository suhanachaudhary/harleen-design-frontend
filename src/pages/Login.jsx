
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokens } from "../utils/authHelper";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr('');

        if (!identifier || !password) return setErr('All fields required.');

        try {
            const res = await axios.post(
                'https://harleen-design-backend.onrender.com/api/auth/login',
                { identifier, password }
            );

            const { accessToken, refreshToken, user } = res.data;
            setTokens(accessToken, refreshToken, user);
            console.log("Saved User:", user);
            nav('/dashboard');
            toast.success("User logged in successfully")
        } catch (err) {
            setErr(err?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="mt-42 flex items-center justify-center">
            <div className="bg-white w-full max-w-md shadow-lg rounded-xl p-8 border border-gray-200">

                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Login
                </h2>

                <form onSubmit={submit}>

                    <div className="mb-4">
                        <input
                            placeholder="Email or Phone"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {err && (
                        <div className="text-red-500 text-sm mb-3">
                            {err}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md transition"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
