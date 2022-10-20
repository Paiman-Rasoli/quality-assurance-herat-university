import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormBorder from "../components/form/formBorder";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import Input from "../components/form/input";
import InputDate from "../components/form/InputDate";

const schema = yup.object({
  facolteNameFr: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facolteNameEng: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  createDate: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Facolte = () => {
  const [loading, setLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
      faclotes.push(data);
      setFacoltes([...faclotes]);
      setAddNew(false);
      console.log(data, faclotes);
    }, 2000);
  };

  useEffect(() => {
    reset();
  }, [addNew, reset]);

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
    <section className="font-vazirBold p-10">
      {!addNew ? (
        <div className="">
          <button
            className="btnS1 px-5 py-2 rounded-sm text-white shadow-md transition-all bg-[#1E408E] ring-offset-2 focus:ring-cyan-300 focus:ring-2"
            onClick={() => setAddNew(true)}
          >
            اضافه کردن فاکولته{" "}
          </button>
        </div>
      ) : (
        <article className="w-full">
          <FormBorder label={"ایجاد فاکولته"}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid min-w-full gap-3"
            >
              <Input
                register={register}
                errors={errors}
                label="نام فاکولته (فارسی)"
                name="facolteNameFr"
                type="text"
              />
              <Input
                register={register}
                errors={errors}
                dir={"ltr"}
                label="نام فاکولته(انگلیسی)"
                name="facolteNameEng"
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
                {loading && <Loading />}
              </div>
            </form>
          </FormBorder>
        </article>
      )}
      <div className="py-10">
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
            {faclotes.map((item, ndx) => (
              <tr
                key={item.facolteNameEng}
                className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                  ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
                }`}
              >
                <td className="text-center">{ndx + 1}</td>
                <td className="text-center">{item.facolteNameFr}</td>
                <td className="text-center">{item.facolteNameEng}</td>
                <td className="text-center">
                  {moment(item.createDate, "YYYY/MM/DD")
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

export default Facolte;
