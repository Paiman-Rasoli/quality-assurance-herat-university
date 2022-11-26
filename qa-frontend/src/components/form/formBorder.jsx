import React from "react";

const FormBorder = ({ children, label }) => {
  return (
    <div className="relative bg-stone-50 shadow-xl z-0 border border-gray-500 m-10 rounded-xl transition-all duration-200">
      <div className="absolute w-full rounded-t-xl border-b border-gray-500 ml-2 bg-stone-200 px-5 py-1">
        <h1 className="text-xl md:text-3xl font-bold text-[#1E408E]">
          {label}
        </h1>
      </div>
      <div className="md:p-16 sm:p-8 p-4 mt-5">{children}</div>
    </div>
  );
};

export default FormBorder;
