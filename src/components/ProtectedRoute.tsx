import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: ("student" | "teacher" | "admin")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        // Mock auth system using localStorage
        const userRole = localStorage.getItem("userRole") as "student" | "teacher" | "admin" | null;

        if (!userRole) {
            toast.error("Please login to access this page");
            setIsAuthorized(false);
            return;
        }

        // Role check removed as per request
        // if (!allowedRoles.includes(userRole)) {
        //   toast.error("You don't have permission to access this page");
        //   setIsAuthorized(false);
        //   return;
        // }

        setIsAuthorized(true);
    }, [location.pathname]);

    if (isAuthorized === null) {
        // Initial loading state could be a spinner
        return null;
    }

    if (!isAuthorized) {
        // Redirect to login, saving the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
