import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormBorder from "../components/form/formBorder";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import Input from "../components/form/input";
import InputDate from "../components/form/InputDate";
import SelectInput from "../components/faculty/select";
import useFetch from "../hooks/useFetch";
import { httpPostDepartments } from "../services/requests";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Department = () => {
  const [loading, setLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const {
    loading: laodingdata,
    data: departments,
    error,
    refetch,
  } = useFetch("department");

  const { data: faculties } = useFetch("faculty");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await httpPostDepartments({
      ...data,
      date: data.date.toJSON().slice(0, 10),
    });
    console.log(res);
    if (res) {
      refetch();
      setLoading(false);
      setAddNew(false);
    }
  };

  useEffect(() => {
    reset();
  }, [addNew, reset]);

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section className="font-vazirBold p-10 w-full">
      {!addNew ? (
        <div className="">
          <button
            className="btnS1 px-5 py-2 rounded-sm text-white shadow-md transition-all bg-[#1E408E] ring-offset-2 focus:ring-cyan-300 focus:ring-2"
            onClick={() => setAddNew(true)}
          >
            اضافه کردن دیپارتمنت{" "}
          </button>
        </div>
      ) : (
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
                name="fa_name"
                type="text"
              />
              <Input
                register={register}
                errors={errors}
                dir="ltr"
                label="نام دیپارتمنت(انگلیسی)"
                name="en_name"
                type="text"
              />
              <SelectInput
                name="facultyId"
                Type={"number"}
                Controller={Controller}
                control={control}
                errors={errors}
                options={faculties?.map((item) => [item.fa_name, item.id])}
                placeholder="فاکولته"
              />
              <InputDate
                register={register}
                errors={errors}
                label="تاریخ"
                name="date"
                type="Date"
                useForm={useForm}
                Controller={Controller}
                control={control}
              />
              <div className="flex gap-5 justify-end w-full">
                <button
                  className="btnS1 px-5 py-2 rounded-sm text-white shadow-md transition-all bg-[#1E408E] ring-offset-2 focus:ring-cyan-300 focus:ring-2"
                  onClick={() => setAddNew(false)}
                >
                  لغو
                </button>
                <button
                  type={"submit"}
                  className="btnS1 px-5 py-2 rounded-sm text-white shadow-md transition-all bg-[#1E408E] ring-offset-2 focus:ring-cyan-300 focus:ring-2"
                >
                  تایید
                </button>
              </div>
            </form>
          </FormBorder>
        </article>
      )}
      <div className="m-10">
        <table className="border rounded-3xl w-full table-auto border-separate md:border-spacing-5 border-spacing-1">
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
                key={ndx}
                className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                  ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
                }`}
              >
                <td className="text-center">{ndx + 1}</td>
                <td className="text-center">{item.fa_name}</td>
                <td className="text-center">{item.en_name}</td>
                <td className="text-center">
                  {moment(item.date, "YYYY/MM/DD")
                    .locale("fa")
                    .format("YYYY/MM/DD")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Department;
