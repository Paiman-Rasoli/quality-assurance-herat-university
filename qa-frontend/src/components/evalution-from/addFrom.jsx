import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../form/Select";
import Loading from "../loading";
import FormBorder from "../form/formBorder";
import { semester_type } from "../../services/list";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputDate from "../form/InputDate";

const schema = yup.object({
  faculty: yup.string().required("لطفا فاکولته مورد نظرتان را انتخاب نمایید "),
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

const AddFrom = ({ faculties }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFacultyName, setSelectedFacultyName] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [teachers, setTeachers] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useMemo(() => {
    const deps = faculties?.filter(
      (fc) => fc.fa_name === selectedFacultyName
    )[0]?.departments;
    // console.log("👴👴", deps);
    setDepartments(deps);
    setSelectedDepartment(null);
    resetField("department");
  }, [faculties, resetField, selectedFacultyName]);

  useMemo(() => {
    // console.log("selected dep ", selectedDepartment, departments);
    const teachers = departments?.filter(
      (dep) => dep.fa_name === selectedDepartment
    )[0]?.teachers;
    // console.log("🤶🤶", teachers);
    setTeachers(teachers);
    resetField("teacher");
  }, [departments, resetField, selectedDepartment]);

  function semesterNumbers(number) {
    const arr = [];
    for (let i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr;
  }

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      reset();
      navigate("./questions");
      setLoading(false);
    }, 2000);
  };

  // console.log("faculties", faculties);

  return (
    <div>
      {" "}
      <FormBorder label={"ایجاد فورم ارزیابی اصلاح تدریس"}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-3">
          <Select
            name="faculty"
            Type={"string"}
            label={"فاکولته"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={faculties?.map((item) => item.fa_name)}
            placeholder="فاکولته"
            setSelectedOptions={setSelectedFacultyName}
            reset={reset}
          />
          {departments && (
            <>
              {" "}
              <Select
                name="department"
                Type={"string"}
                label={"دیپارتمنت"}
                errors={errors}
                Controller={Controller}
                control={control}
                options={departments?.map((dep) => dep.fa_name)}
                placeholder="دیپارتمنت"
                className={!selectedFacultyName && "disabled"}
                setSelectedOptions={setSelectedDepartment}
              />
              {teachers && (
                <Select
                  name="teacher"
                  Type={"string"}
                  label={"استاد"}
                  errors={errors}
                  Controller={Controller}
                  control={control}
                  options={teachers?.map((teacher) => teacher.fa_name)}
                  placeholder="استاد"
                  className={!departments && "disabled"}
                />
              )}
              <Select
                name="semesterType"
                Type={"string"}
                label={"نوعیت سمستر"}
                errors={errors}
                Controller={Controller}
                control={control}
                options={semester_type}
                placeholder="نوعیت سمستر"
              />
              <Select
                name="semesterNumber"
                Type={"number"}
                label="سمستر"
                errors={errors}
                Controller={Controller}
                control={control}
                options={semesterNumbers(14)}
                placeholder="سمستر"
                className={!selectedFacultyName && "disabled"}
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
                defaultValue={new Date()}
              />
            </>
          )}{" "}
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
      </FormBorder>
    </div>
  );
};

export default AddFrom;
