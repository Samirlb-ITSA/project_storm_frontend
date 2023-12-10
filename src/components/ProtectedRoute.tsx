import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/AuthStore"

export const ProtectedRoute = ( {children, to}: any ) => {
    const isAuthenticated = useAuthStore(state => state.session);

    return isAuthenticated === null ? <Navigate to={to} /> : children;
}