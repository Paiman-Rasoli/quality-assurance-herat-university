import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormBorder from "../components/form/formBorder";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import Input from "../components/form/input";
import InputDate from "../components/form/InputDate";

const schema = yup.object({
  DepartmentNameFr: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  DepartmentNameEng: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  createDate: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const AddDepartment = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
      departments.push(data);
      setDepartments([...departments]);
      console.log(data, departments);
    }, 2000);
  };

  const [departments, setDepartments] = useState([
    {
      DepartmentNameFr: "طب",
      DepartmentNameEng: "Phs",
      number_of_sem: 14,
      departments: ["معالجوی", "ستوماتولوژی"],
      createDate: new Date(),
    },
    {
      DepartmentNameFr: "انجنیری",
      DepartmentNameEng: "Eng",
      number_of_sem: 8,
      departments: ["سیول", "مهندسی"],
      createDate: new Date(),
    },
  ]);

  const [value, setValue] = useState(new Date());

  return (
    <section className="w-full p-1 md:p-5 lg:p-10 grid font-vazirBold">
      <article className="w-full">
        <FormBorder label={"ایجاد دیپارتمنت"}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid min-w-full gap-3"
          >
            <Input
              register={register}
              errors={errors}
              label="نام دیپارتمنت (فارسی)"
              name="DepartmentNameFr"
              type="text"
            />
            <Input
              register={register}
              errors={errors}
              label="نام دیپارتمنت(انگلیسی)"
              name="DepartmentNameEng"
              type="text"
            />
            <InputDate
              register={register}
              errors={errors}
              label="تاریخ"
              name="createDate"
              type="Date"
              useForm={useForm}
              Controller={Controller}
              control={control}
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
        <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
          <tr className="divide-x-2 divide-y-2 bg-stone-300">
            <th className="font-normal text-center">شماره</th>
            <th className="font-normal text-center">نام فارسی</th>
            <th className="font-normal text-center">نام انگلیسی</th>
            <th className="font-normal text-center">تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody className="font-vazirBold text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
          {departments.map((item, ndx) => (
            <tr
              key={item.DepartmentNameEng}
              className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
              }`}
            >
              <td className="text-center">{ndx + 1}</td>
              <td className="text-center">{item.DepartmentNameFr}</td>
              <td className="text-center">{item.DepartmentNameEng}</td>
              <td className="text-center">
                {moment(item.createDate, "YYYY/MM/DD")
                  .locale("fa")
                  .format("YYYY/MM/DD")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AddDepartment;
