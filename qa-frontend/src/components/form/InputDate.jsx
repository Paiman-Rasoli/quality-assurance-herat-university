import React, { useState } from "react";

import DatePicker from "react-multi-date-picker";

import Gregorian from "react-date-object/calendars/gregorian";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const InputDate = ({
  useForm,
  control,
  Controller,
  register,
  label,
  type,
  name,
}) => {
  const [Cathdate, setDate] = useState(new Date());
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name="date"
        rules={{ required: true }} //optional
        render={({
          field: { onChange, name, value },
          fieldState: { invalid, isDirty }, //optional
          formState: { errors }, //optional, but necessary if you want to show an error message
        }) => (
          <>
            <DatePicker
              value={value}
              onChange={(date) => {
                onChange(date);
                console.log(date, value);
                setDate(date.convert(Gregorian, persian_fa));
              }}
              format={"YYYY/MM/DD"}
              //   calendar={persian}
              //   locale={persian_fa}
              inputClass="w-full border-2 border-[#1E408E] p-1 rounded"
            />
            {errors && errors[name] && errors[name].type === "required" && (
              //if you want to show an error message
              <span>your error message!</span>
            )}
          </>
        )}
      />

      {/* <DatePicker
        calendar={persian}
        locale={persian_fa}
        inputClass="w-full border-2 border-[#1E408E] p-1 rounded"
      /> */}

      <input
        type={type}
        value={Cathdate}
        {...register(name)}
        className="border-2 hidden border-[#1E408E] p-1 rounded"
      />
    </div>
  );
};

export default InputDate;
