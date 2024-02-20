import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AuthLayout = () => {
    const { isLoggedIn } = useAppContext();
    return <section>{isLoggedIn ? <Outlet /> : <h1>Unauthorized</h1>}</section>;
};
export default AuthLayout;
