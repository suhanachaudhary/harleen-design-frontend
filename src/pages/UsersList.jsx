
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { getUser } from "../utils/authHelper";
import toast from "react-hot-toast";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);
    const currentUser = getUser();

    const fetch = async (p = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');

            const res = await axios.get(
                'https://harleen-design-backend.onrender.com/api/users',
                {
                    params: { page: p, limit, q },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data.data);
            setPage(res.data.page);
            setPages(res.data.pages);

            console.log("Users:", res.data.data);


        } catch (err) {
            toast.error('Only admin access this page');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetch(1); }, []);

    const onSearch = (e) => {
        e.preventDefault();
        fetch(1);
    };

    const onDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return;
        try {
            const token = localStorage.getItem('accessToken');
            console.log("TOKEN USED:", token);

            await axios.delete(`https://harleen-design-backend.onrender.com/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("User deleted...")
            fetch(page);
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Delete failed');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-4xl font-semibold mb-6">Users</h2>

            <div className="bg-white p-6 rounded-xl shadow-md">

                {/* Search Bar */}
                <form
                    onSubmit={onSearch}
                    className="flex gap-3 mb-6"
                >
                    <input
                        placeholder="Search name/email/state/city"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-xl"
                    />

                    <button
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xl"
                    >
                        Search
                    </button>
                </form>

                {loading ? (
                    <p className="text-center py-10 text-lg font-medium">Loading...</p>
                ) : (
                    <>
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse bg-white text-left">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="p-3 text-xl font-semibold">Avatar</th>
                                        <th className="p-3 text-xl font-semibold">Name</th>
                                        <th className="p-3 text-xl font-semibold">Email</th>
                                        <th className="p-3 text-xl font-semibold">Phone</th>
                                        <th className="p-3 text-xl font-semibold">State</th>
                                        <th className="p-3 text-xl font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr
                                            key={u._id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="p-3">

                                                <img
                                                    className="w-12 h-12 rounded-full object-cover border"
                                                    src={
                                                        u.profile_image?.startsWith("http")
                                                            ? u.profile_image
                                                            : `https://harleen-design-backend.onrender.com${u.profile_image}`
                                                    }
                                                    alt=""
                                                />

                                            </td>
                                            <td className="p-3 font-medium">{u.name}</td>
                                            <td className="p-3">{u.email}</td>
                                            <td className="p-3">{u.phone}</td>
                                            <td className="p-3">{u.state}</td>

                                            <td className="p-3 flex gap-2 flex-wrap">

                                                <Link to={`/users/${u._id}`}>
                                                    <button className="px-4 py-1.5 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                                                        View
                                                    </button>
                                                </Link>

                                                {(currentUser?.role === 'admin' || currentUser?._id === u._id) && (
                                                    <Link to={`/users/${u._id}/edit`}>
                                                        <button className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                                            Edit
                                                        </button>
                                                    </Link>
                                                )}

                                                {currentUser?.role === 'admin' && (
                                                    <button
                                                        className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                        onClick={() => onDelete(u._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6">
                            <Pagination
                                page={page}
                                pages={pages}
                                onChange={(p) => fetch(p)}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UsersList;
