import React, { useContext, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import Select from "../form/Select";
import Loading from "../loading";
import FormBorder from "../form/formBorder";
import { semester_type } from "../../services/list";
import { useNavigate } from "react-router-dom";
import InputTime from "../form/InputTime";
import { httpPostForm } from "../../services/evalution-form";
import useFetch from "../../hooks/useFetch";
import { FacultyContext } from "../../context/facultyContext";

const schema = yup.object({
  faculty: yup.string().required("لطفا فاکولته مورد نظرتان را انتخاب نمایید "),
  department: yup
    .string()
    .required("لطفا دیپارتمنت مورد نظرتان را انتخاب نمایید "),
  teacher: yup.string().required("لطفا استاد مورد نظرتان را انتخاب نمایید "),
  subject: yup.string().required("لطفا مضمون مورد نظرتان را انتخاب نمایید "),
  semester_type: yup
    .string()
    .required("لطفا نوعیت سمستر مورد نظرتان را انتخاب نمایید "),
  semester: yup
    .number()
    .nullable()
    .required("لطفا سمستر مورد نظرتان را انتخاب نمایید ")
    .min(1),
  start_date: yup.number().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
  end_date: yup.number().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const AddFrom = ({ faculties }) => {
  const faculty = useContext(FacultyContext);
  const [loading, setLoading] = useState(false);
  const [selectedFacultyName, setSelectedFacultyName] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [teachers, setTeachers] = useState(null);

  let { data: subjects } = useFetch("subject");

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
    resetField("subject");
  }, [departments, resetField, selectedDepartment]);

  subjects = selectedDepartment
    ? subjects?.filter((subj) => subj.department.fa_name === selectedDepartment)
    : subjects;

  const onSubmit = async (data) => {
    // setLoading(true);
    console.log("form data", {
      ...data,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      year: new Date(data.start_date).getFullYear(),
    });

    const res = await httpPostForm({
      ...data,
      year: new Date(data.start_date).getFullYear(),
    });
    console.log("res-form", res, await res.json());
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
              {teachers && (
                <Select
                  name="subject"
                  Type="string"
                  label="مضمون"
                  errors={errors}
                  Controller={Controller}
                  control={control}
                  options={subjects?.map((subject) => subject.name)}
                  placeholder="مضمون"
                  className={!departments && "disabled"}
                />
              )}
              <Select
                name="semester_type"
                Type={"string"}
                label={"نوعیت سمستر"}
                errors={errors}
                Controller={Controller}
                control={control}
                options={semester_type}
                placeholder="نوعیت سمستر"
              />
              <Select
                name="semester"
                Type={"number"}
                label="سمستر"
                errors={errors}
                Controller={Controller}
                control={control}
                options={semesterNumbers(14)}
                placeholder="سمستر"
                className={!selectedFacultyName && "disabled"}
              />
              <InputTime
                register={register}
                errors={errors}
                label="تاریخ شروع"
                name="start_date"
                type="Date"
                useForm={useForm}
                Controller={Controller}
                control={control}
                defaultValue={Date.now}
              />
              <InputTime
                register={register}
                errors={errors}
                label="تاریخ ختم"
                name="end_date"
                type="Date"
                useForm={useForm}
                Controller={Controller}
                control={control}
                defaultValue={Date.now() + 1000 * 60 * 60 * 24}
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

function semesterNumbers(number) {
  const arr = [];
  for (let i = 1; i <= number; i++) {
    arr.push(i);
  }
  return arr;
}
