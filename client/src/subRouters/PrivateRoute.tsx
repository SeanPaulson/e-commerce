import { ContextApp } from "../components/UserContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { state } = useContext(ContextApp);

  if (Object.keys(state.userProfile).length != 0) {
    console.log('authorized')
    return <Outlet context={state} />
  }
  return <Navigate to="/" replace />;
}
