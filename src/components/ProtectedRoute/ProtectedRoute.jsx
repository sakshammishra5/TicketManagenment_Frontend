// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("token");   // or use context

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
