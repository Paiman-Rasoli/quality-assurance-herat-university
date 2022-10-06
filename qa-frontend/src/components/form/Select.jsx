import React from "react";

const Select = ({ name, register, options, placeholder, errors }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 w-full">
      <label
        htmlFor={`${name}`}
        className="flex flex-wrap font-normal text-xl items-center text-[#1E408E]"
      >
        {placeholder}
      </label>
      <select
        {...register(`${name}`)}
        className="w-full h-12 border border-[#8692A6] rounded p-2"
        defaultValue=""
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((item, ndx) => (
          <option value={item} key={ndx}>
            {item}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-xs">{errors[name]?.message}</p>
    </div>
  );
};

export default Select;
