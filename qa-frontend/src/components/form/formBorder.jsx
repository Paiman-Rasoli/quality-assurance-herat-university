import React from "react";

const FormBorder = ({ children, label }) => {
  return (
    <div className="relative bg-stone-50 shadow-xl z-0 border border-gray-500 m-10 rounded-xl transition-all duration-200">
      <div className="absolute -top-5 ml-2 right-2 lg:right-7 bg-stone-200 rounded-xl px-5 py-1">
        <h1 className="text-xl md:text-3xl font-bold text-[#1E408E]">
          {label}
        </h1>
      </div>
      <div className="md:p-16 sm:p-8 p-4 pt-16">{children}</div>
    </div>
  );
};

export default FormBorder;
