import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormBorder from "../components/form/formBorder";
import * as yup from "yup";
import Loading from "../components/loading";
import Input from "../components/form/input";

const schema = yup.object({
  facolteNameFr: yup.string().required(),
  facolteNameEng: yup.string().required(),
  createDate: yup.date().required(),
});

const AddFacolte = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
      faclotes.push(data);
      setFacoltes([...faclotes]);
      console.log(data, faclotes);
    }, 2000);
  };

  const [faclotes, setFacoltes] = useState([
    {
      facolteNameFr: "طب",
      facolteNameEng: "Phs",
      number_of_sem: 14,
      departments: ["معالجوی", "ستوماتولوژی"],
      createDate: new Date(),
    },
    {
      facolteNameFr: "انجنیری",
      facolteNameEng: "Eng",
      number_of_sem: 8,
      departments: ["سیول", "مهندسی"],
      createDate: new Date(),
    },
  ]);

  return (
    <section className="p-10 grid justify-center font-vazirBold">
      <article>
        <FormBorder label={"ایجاد فاکولته"}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid min-w-full gap-3"
          >
            <Input
              register={register}
              label="نام فاکولته (فارسی)"
              name="facolteNameFr"
              type="text"
            />
            <Input
              register={register}
              label="نام فاکولته(انگلیسی)"
              name="facolteNameEng"
              type="text"
            />
            <Input
              register={register}
              label="تاریخ"
              name="createDate"
              type="Date"
            />
            <div className="flex justify-end px-20">
              <button
                type={"submit"}
                className="px-5 py-2 rounded-full text-white hover:shadow-2xl shadow-md transition-all hover:scale-105 bg-[#1E408E]"
              >
                تایید
              </button>
              {loading && <Loading />}
            </div>
          </form>
        </FormBorder>
      </article>

      <table className="border rounded-3xl lg:min-w-[50rem] md:w-full table-auto border-separate md:border-spacing-5 border-spacing-1">
        <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base text-[#949494]">
          <tr className="divide-x-2 divide-y-2">
            <th className="font-normal text-start">شماره</th>
            <th className="font-normal text-start">نام فارسی</th>
            <th className="font-normal text-start">نام انگلیسی</th>
            <th className="font-normal text-start">تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody className="font-vazirBold text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
          {faclotes.map((item, ndx) => (
            <tr
              key={item.facolteNameEng}
              className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse"
            >
              <td>{ndx + 1}</td>
              <td>{item.facolteNameFr}</td>
              <td>{item.facolteNameEng}</td>
              <td>{item.createDate.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AddFacolte;
