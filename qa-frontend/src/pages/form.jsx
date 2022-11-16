import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormBorder from "../components/form/formBorder";
import Select from "../components/form/Select";
import Loading from "../components/loading";

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

const Form = () => {
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
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setLoading(true);
    setFormData(data);
    console.log(data);
    setTimeout(() => {
      reset();
      navigate("./questions");
      setLoading(false);
      setShowQuestion(true);
    }, 2000);
  };

  return (
    <section className="font-vazirBold p-10 w-full">
      <div className="grid w-full font-vazirBold">
        <FormBorder label={"ایجاد فورم ارزیابی اصلاح تدریس"}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-3">
            <Select
              name="facolte"
              Type={"string"}
              Controller={Controller}
              control={control}
              errors={errors}
              options={facoltes.map((item) => item.name)}
              placeholder="فاکولته"
              setSelectedOptions={setSelectedFacolte}
              reset={reset}
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
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                تایید
              </button>
              {loading && <Loading />}
            </div>
          </form>
          {showQuestion && <Questions formData={formData} />}
        </FormBorder>
      </div>
    </section>
  );
};

export default Form;
