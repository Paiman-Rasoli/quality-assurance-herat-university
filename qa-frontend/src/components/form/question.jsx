import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

const Options = [
  { name: "عالی", inStock: true },
  { name: "خوب", inStock: true },
  { name: "متوسط", inStock: true },
  { name: "کم", inStock: true },
  { name: "خیلی کم", inStock: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Question = ({ Controller, control, errors, name, question }) => {
  const [options, setOptions] = useState(Options[2]);
  return (
    <Controller
      control={control}
      defaultValue={""}
      name={name}
      render={({ field: { onChange } }) => (
        <div className="my-3 grid w-full">
          <RadioGroup
            value={options}
            onChange={(e) => {
              onChange(e.name);
              setOptions(e);
            }}
            className="mt-2 w-full"
          >
            <RadioGroup.Label>{question}</RadioGroup.Label>
            <div className="mt-3  grid grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-5">
              {Options.map((option) => (
                <RadioGroup.Option
                  key={option.name}
                  value={option}
                  className={({ active, checked }) =>
                    classNames(
                      option.inStock
                        ? "cursor-pointer focus:outline-none"
                        : "opacity-25 cursor-not-allowed",
                      active ? "ring-2 ring-offset-2 ring-cyan-500" : "",
                      checked
                        ? "bg-cyan-600 border-transparent text-white hover:bg-cyan-700"
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                      "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                    )
                  }
                  disabled={!option.inStock}
                >
                  <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
            {errors[name] && (
              <p className="text-red-500 text-xs">{errors[name]?.message}</p>
            )}
          </RadioGroup>
        </div>
      )}
    />
  );
};

export default Question;

{
  /* <article className="flex flex-wrap gap-5 justify-around w-full m-2">
<div className="flex gap-1">
  <label htmlFor={`${name}a1`}>خیلی زیاد</label>
  <input
    {...register(`${name}`)}
    type="radio"
    id={`${name}a1`}
    value="خیلی زیاد"
    className="h-5 w-10 rounded"
    placeholder="خیلی"
  />
</div>

<div className="flex gap-1">
  <label htmlFor={`${name}a2`}> زیاد</label>
  <input
    {...register(`${name}`)}
    type="radio"
    id={`${name}a2`}
    value="زیاد"
  />
</div>

<div className="flex gap-1">
  <label htmlFor={`${name}a3`}>متوسط</label>
  <input
    {...register(`${name}`)}
    type="radio"
    id={`${name}a3`}
    value="متوسط"
  />
</div>

<div className="flex gap-1">
  <label htmlFor={`${name}a4`}>کم</label>
  <input
    {...register(`${name}`)}
    type="radio"
    id={`${name}a4`}
    value="کم"
  />
</div>

<div className="flex gap-1">
  <label htmlFor={`${name}a5`}>خیلی کم</label>
  <input
    {...register(`${name}`)}
    type="radio"
    id={`${name}a5`}
    value="خیلی کم"
  />
</div>
{errors[name] && (
  <p className="text-red-500 text-xs">{errors[name]?.message}</p>
)}
</article> */
}
