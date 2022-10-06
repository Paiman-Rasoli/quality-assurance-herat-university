import React from "react";

const FormBorder = ({ children, label }) => {
  return (
    <div className="relative z-0 border border-gray-500 m-10 rounded">
      <div className="absolute -top-5 right-7 bg-white px-5">
        <h1 className="text-3xl font-bold text-[#1E408E]">{label}</h1>
      </div>
      <div className="md:p-16 sm:p-8 p-4 pt-16">{children}</div>
    </div>
  );
};

export default FormBorder;
