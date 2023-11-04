import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/AuthStore"

export const PublicRoutes = ( {children, to}: any ) => {
    const isAuthenticated = useAuthStore(state => state.session);

    return isAuthenticated === null ? children : <Navigate to={to} />;
}