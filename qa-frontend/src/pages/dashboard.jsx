import React from "react";
import { Transition } from "@headlessui/react";
import { Helmet } from "react-helmet";

const Home = () => {
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
      <Helmet>
        <title>دانشگاه هرات</title>
      </Helmet>
      <section className="grid place-content-center font-vazirBlack mt-20">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center">
          <div className="block xl:inline">دانشگاه هرات </div>
          <span className="block text-cyan-600 xl:inline">
            کمیته تضمین کیفیت{" "}
          </span>
        </h1>
      </section>
    </Transition>
  );
};

export default Home;
