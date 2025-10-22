import { Navigate,Outlet } from "react-router-dom";

export default function PrivateRoute()
{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return  isLoggedIn ==="true" ?<Outlet/>:<Navigate to="/"/>;
}