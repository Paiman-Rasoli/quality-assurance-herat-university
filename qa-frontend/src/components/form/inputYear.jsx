import React, { useState } from "react";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const InputYear = ({
  control,
  Controller,
  label,
  name,
  errors,
  defaultValue,
}) => {
  const [year, setYear] = useState(defaultValue);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        value={year}
        defaultValue={defaultValue}
        rules={{
          required: {
            value: true,
            message: "لطفا سال مورد نظر تان را وارد نمایید",
          },
        }}
        render={({ field: { onChange, name, value } }) => (
          <div className="grid">
            <DatePicker
              onlyYearPicker
              value={value}
              onChange={(date) => {
                onChange(new Date(date).getTime());
                setYear(date.year);
                console.log(year, date.year, value, +new Date(value));
              }}
              calendar={persian}
              locale={persian_fa}
              format={"YYYY"}
              inputClass="w-full border-2 border-[#1E408E] p-1 rounded"
            />
            {errors[name] && (
              <p className="text-red-500 text-xs">{errors[name]?.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default InputYear;
