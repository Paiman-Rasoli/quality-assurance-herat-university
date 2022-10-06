import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormBorder from "../components/form/formBorder";
import Select from "../components/form/Select";
import Loading from "../components/loading";

import {
  facoltes,
  semester_number,
  semester_type,
  teachers,
} from "../services/list";

const Student = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
  };

  const handleFacolte = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="p-10 grid justify-center font-vazirBold">
      <h1 className="text-center text-5xl">دانشگاه هرات - کمیته تضمین کیفیت</h1>
      <FormBorder label={"فورم ارزیابی اصلاح تدریس"}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <Select
            name="facolte"
            errors={errors}
            register={register}
            options={facoltes.map((item) => item.name)}
            placeholder="فاکولته"
          />
          <Select
            name="detartment"
            errors={errors}
            register={register}
            options={facoltes.map((item) => item.name)}
            placeholder="دیپارتمنت"
          />
          <Select
            name="teacher"
            errors={errors}
            register={register}
            options={teachers}
            placeholder="استاد"
          />
          <Select
            name="semesterType"
            errors={errors}
            register={register}
            options={semester_type}
            placeholder="نوعیت سمستر"
          />
          <Select
            name="semesterNumber"
            errors={errors}
            register={register}
            options={semester_number}
            placeholder="انتخاب سمستر"
          />
          <div className="flex justify-end px-20 mt-10">
            <button
              type={"submit"}
              className="px-5 py-2 rounded-full text-white bg-[#1E408E]"
            >
              تایید
            </button>
            {loading && <Loading />}
          </div>
        </form>
      </FormBorder>
    </div>
  );
};

export default Student;
