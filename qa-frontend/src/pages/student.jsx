import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormBorder from "../components/form/formBorder";
import Select from "../components/form/Select";
import Loading from "../components/loading";
import { Transition } from "@headlessui/react";

import { facoltes, semester_type, teachers } from "../services/list";
import Questions from "./questions";
import { useNavigate } from "react-router-dom";

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
    .nullable()
    .required("لطفا سمستر مورد نظرتان را انتخاب نمایید ")
    .min(1),
});

const Student = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedFacolte, setSelectedFacolte] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const navigate = useNavigate();

  function semesterNumbers(number) {
    const arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr;
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setLoading(true);
    setFormData(data);
    console.log(data);
    setTimeout(() => {
      navigate("./questions");
      setLoading(false);
      setShowQuestion(true);
    }, 2000);
  };

  return (
    <Transition
      show={true}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="p-10 grid justify-center w-full font-vazirBold">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">دانشگاه هرات</span>{" "}
          <span className="block text-cyan-600 xl:inline">
            کمیته تضمین کفییت{" "}
          </span>
        </h1>
        <FormBorder label={"فورم ارزیابی اصلاح تدریس"}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid min-w-full gap-3"
          >
            <Select
              name="facolte"
              Type={"string"}
              Controller={Controller}
              control={control}
              errors={errors}
              options={facoltes.map((item) => item.name)}
              placeholder="فاکولته"
              setSelectedOptions={setSelectedFacolte}
            />
            <Select
              name="department"
              Type={"string"}
              errors={errors}
              Controller={Controller}
              control={control}
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
              Type={"string"}
              errors={errors}
              Controller={Controller}
              control={control}
              options={teachers}
              placeholder="استاد"
              className={!selectedDepartment && "disabled"}
            />
            <Select
              name="semesterType"
              Type={"string"}
              errors={errors}
              Controller={Controller}
              control={control}
              options={semester_type}
              placeholder="نوعیت سمستر"
            />
            <Select
              name="semesterNumber"
              Type={"number"}
              errors={errors}
              Controller={Controller}
              control={control}
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
                className="rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium sm:flex-1 text-white bg-cyan-600 hover:bg-cyan-700"
              >
                تایید
              </button>
              {loading && <Loading />}
            </div>
          </form>
          {showQuestion && <Questions formData={formData} />}
        </FormBorder>
      </div>
    </Transition>
  );
};

export default Student;
