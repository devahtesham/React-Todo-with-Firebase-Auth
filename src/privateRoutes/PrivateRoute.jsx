import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return localStorage.getItem("uid") ? <Outlet /> : <Navigate to="/login" />;
  // jo kaam components k andr chidren prop krta hy wohi kaam routing k andr <Outlet /> krta hy.. child route returns krta hy
};

export default PrivateRoute;
