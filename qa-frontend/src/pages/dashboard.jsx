import React from "react";
import { Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <Transition
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <section className="grid place-content-center font-vazirBold min-h-screen">
        <NavLink to={"addfacolte"}>فاکولته</NavLink>
      </section>
    </Transition>
  );
};

export default Dashboard;
