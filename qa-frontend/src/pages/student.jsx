import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  id: yup.string().required("لطفا آی دی را وارد نمایید"),
});

const Student = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (e) => {
    console.log("id", e);
  };

  return (
    <main className="font-vazirBold my-10 px-5">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center mb-5 leading-10">
        <span className="block xl:inline">دانشگاه هرات</span>{" "}
        <span className="block text-cyan-600 xl:inline">
          کمیته تضمین کیفیت{" "}
        </span>
      </h1>
      <section className="flex justify-center px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <label htmlFor="id">
            <h5>لطفا آیدی فورم مورد نظرتان را وارد نمایید</h5>
          </label>
          <div>
            <input
              type="text"
              dir="ltr"
              lang="en"
              autoFocus
              {...register("id")}
              className="w-full font-bold uppercase font-sans border-2 border-[#1E408E] text-[#1E408E] p-1 rounded"
              placeholder="ID"
            />
            {errors?.["id"] && (
              <p className="text-red-500">{errors?.["id"].message}</p>
            )}
          </div>
          <div className="flex justify-end px-20">
            <button
              type={"submit"}
              className="px-5 py-2 rounded-sm text-white bg-[#1E408E] hover:bg-[#3672ff]"
            >
              تایید
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Student;
