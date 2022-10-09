import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="grid place-content-center font-vazirBold min-h-screen">
      <NavLink to={"addfacolte"}>فاکولته</NavLink>
    </section>
  );
};

export default Dashboard;
