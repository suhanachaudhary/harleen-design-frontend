
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setTokens } from "../utils/authHelper";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Register = () => {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', address: '', state: '', city: '', country: '', pincode: '', password: ''
    });
    const [file, setFile] = useState(null);
    const [err, setErr] = useState('');
    const nav = useNavigate();

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setErr('');

        // Validation
        if (!form.name || form.name.length < 3) return setErr('Name min 3 chars');
        if (!form.email) return setErr('Email required');
        if (!form.password || form.password.length < 6) return setErr('Password min 6 chars');

        try {
            const data = new FormData();
            Object.keys(form).forEach(k => data.append(k, form[k]));
            if (file) data.append('profile_image', file);

            const res = await axios.post(
                'https://harleen-design-backend.onrender.com/api/auth/register',
                data,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            const { accessToken, refreshToken, user } = res.data;
            setTokens(accessToken, refreshToken, user);
            nav('/dashboard');
            toast.success("New user register")

        } catch (err) {
            setErr(err?.response?.data?.message || 'Register failed');
        }
    };

    return (
        <div className="mt-22 flex items-center justify-center">
            <div className="bg-white w-full max-w-3xl shadow-lg rounded-xl p-8 border border-gray-200">

                <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                    Create Account
                </h2>

                <form onSubmit={submit}>

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={onChange}
                            className="input text-xl"
                        />

                        <input
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={onChange}
                            className="input text-xl"
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <input
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={onChange}
                            className="input text-xl"
                        />

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={onChange}
                            className="input text-xl"
                        />
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <input
                            name="state"
                            placeholder="State"
                            value={form.state}
                            onChange={onChange}
                            className="input text-xl"
                        />

                        <input
                            name="city"
                            placeholder="City"
                            value={form.city}
                            onChange={onChange}
                            className="input text-xl"
                        />
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <input
                            name="country"
                            placeholder="Country"
                            value={form.country}
                            onChange={onChange}
                            className="input text-xl"
                        />

                        <input
                            name="pincode"
                            placeholder="Pincode"
                            value={form.pincode}
                            onChange={onChange}
                            className="input text-xl"
                        />
                    </div>

                    {/* Address */}
                    <div className="mt-4">
                        <textarea
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={onChange}
                            className="input h-28 resize-none text-xl"
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    <div className="mt-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setFile(e.target.files[0])}
                            className="block w-full text-gray-700 file:bg-gray-900 file:text-white file:px-4 file:py-2 file:rounded-md file:hover:bg-gray-700 cursor-pointer text-xl"
                        />
                    </div>

                    {/* Error */}
                    {err && (
                        <div className="text-red-500 text-sm mt-3">
                            {err}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md text-xl mt-6 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
