
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const EditUser = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState({});
    const [file, setFile] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                console.log("TOKEN USED:", token);
                const res = await axios.get(`https://harleen-design-backend.onrender.com/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setForm(res.data.data);
            } catch (err) {
                toast.error('Cannot load user');
            }
        };
        load();
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(form).forEach(k => {
                if (form[k] !== undefined && k !== '_id') data.append(k, form[k]);
            });
            if (file) data.append('profile_image', file);

            const token = localStorage.getItem('accessToken');
            console.log("TOKEN USED:", token);
            await axios.put(
                `https://harleen-design-backend.onrender.com/api/users/${id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success('User details updated');
            nav(`/users/${id}`);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Update failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit User</h2>

            <form
                onSubmit={submit}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        value={form.name || ''}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Name"
                        className="input"
                    />

                    <input
                        value={form.email || ''}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Email"
                        className="input"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <input
                        value={form.phone || ''}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Phone"
                        className="input"
                    />

                    <input
                        value={form.state || ''}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        placeholder="State"
                        className="input"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <input
                        value={form.city || ''}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="City"
                        className="input"
                    />

                    <input
                        value={form.country || ''}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        placeholder="Country"
                        className="input"
                    />
                </div>

                <div className="mt-4">
                    <input
                        value={form.pincode || ''}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        placeholder="Pincode"
                        className="input"
                    />
                </div>

                <div className="mt-4">
                    <textarea
                        value={form.address || ''}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Address"
                        className="input h-28 resize-none"
                    />
                </div>

                <div className="mt-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full text-gray-700 file:bg-gray-900 file:text-white file:px-4 file:py-2 file:rounded-md file:hover:bg-gray-700 cursor-pointer"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-6 py-2 rounded-md shadow-md transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditUser;
