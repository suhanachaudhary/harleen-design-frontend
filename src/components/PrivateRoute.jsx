
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from "../utils/authHelper";

const PrivateRoute = () => {
    return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
