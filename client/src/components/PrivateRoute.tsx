import { ContextApp } from "./UserContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavbarComponent from "./navbar/Navbar";

export default function PrivateRoute() {
  const { state } = useContext(ContextApp);

  if (Object.keys(state.userProfile).length != 0) {
    return (
      <>
        <NavbarComponent />
        <Outlet context={state} />
      </>
    );
  }
  return <Navigate to="/" replace />;
}
