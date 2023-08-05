import NavbarComponent from "./navbar/Navbar"
import { Outlet } from "react-router"

export default function NavbarWrapper(){
    return (
        <>
        <NavbarComponent />
        <Outlet />
        </>
    )
};