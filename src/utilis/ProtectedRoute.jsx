import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = (props) => {
    const { user, isLoading } = useAuth();
    const roleName = user?.role.roleName;
    const authorize = props.role.some((item) => item == roleName);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }

    if (authorize) {
        return props.children;
    }
    else if (roleName == "ADMIN" || roleName == "APPRAISER") {
        return <Navigate to={"/dashboard"} />
    }
    else {
        return <Navigate to={"/unauthorize"} />
    }
}

export default ProtectedRoute;