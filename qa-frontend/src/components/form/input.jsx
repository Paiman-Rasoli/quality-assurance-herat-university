import React from "react";

const Input = ({ register, label, type, name }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <label htmlFor="name">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="border-2 border-[#1E408E] p-1 rounded"
      />
    </div>
  );
};

export default Input;
