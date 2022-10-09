import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormBorder from "../components/form/formBorder";
import Select from "../components/form/Select";
import Loading from "../components/loading";

import { facoltes, semester_type, teachers } from "../services/list";
import Questions from "./questions";

const schema = yup.object({
  facolte: yup.string().required("لطفا فاکولته مورد نظرتان را انتخاب نمایید "),
  department: yup
    .string()
    .required("لطفا دیپارتمنت مورد نظرتان را انتخاب نمایید "),
  teacher: yup.string().required("لطفا استاد مورد نظرتان را انتخاب نمایید "),
  semesterType: yup
    .string()
    .required("لطفا نوعیت سمستر مورد نظرتان را انتخاب نمایید "),
  semesterNumber: yup
    .number()
    .required("لطفا سمستر مورد نظرتان را انتخاب نمایید ")
    .min(1),
});

const Student = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedFacolte, setSelectedFacolte] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  function semesterNumbers(number) {
    const arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setLoading(true);
    setFormData(data);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
      setShowQuestion(true);
    }, 2000);
  };

  return (
    <div className="p-10 grid justify-center w-full font-vazirBold">
      <h1 className="text-center text-5xl">دانشگاه هرات - کمیته تضمین کیفیت</h1>
      <FormBorder label={"فورم ارزیابی اصلاح تدریس"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Select
            name="facolte"
            errors={errors}
            register={register}
            options={facoltes.map((item) => item.name)}
            placeholder="فاکولته"
            setSelectedOptions={setSelectedFacolte}
          />
          <Select
            name="department"
            errors={errors}
            register={register}
            options={
              facoltes
                .filter((fc) => fc.name === selectedFacolte)
                .map((e) => e.departments)[0]
            }
            placeholder="دیپارتمنت"
            className={!selectedFacolte && "disabled"}
            setSelectedOptions={setSelectedDepartment}
          />
          <Select
            name="teacher"
            errors={errors}
            register={register}
            options={teachers}
            placeholder="استاد"
            className={!selectedDepartment && "disabled"}
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
            options={semesterNumbers(
              ...facoltes
                .filter((fc) => fc.name === selectedFacolte)
                .map((e) => e.number_of_sem)
            )}
            placeholder="انتخاب سمستر"
            className={!selectedFacolte && "disabled"}
          />
          <div className="flex justify-end px-20">
            <button
              type={"submit"}
              className="px-5 py-2 rounded-full text-white bg-[#1E408E]"
            >
              تایید
            </button>
            {loading && <Loading />}
          </div>
        </form>
        {showQuestion && <Questions formData={formData} />}
      </FormBorder>
    </div>
  );
};

export default Student;
