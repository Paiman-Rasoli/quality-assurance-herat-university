import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useFetch from "../../hooks/useFetch";
import Loading from "../loading";
import Select from "./SelectForFilter";

const schema = yup.object({
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  departmentId: yup
    .number()
    .nullable()
    .required("لطفا این قسمت را تکمیل نمایید"),
  //   date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const FilterTeacher = ({ setSelectedFac, setSelectedDep }) => {
  const [selectedFaculty, setSelectedFaculty] = useState([]);

  const { data: faculties, loading, error } = useFetch("faculty");

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { facultyId: null, departmentId: null },
  });

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  const submitForm = (data) => {
    console.log("e", data);
  };

  return (
    <div className="flex flex-wrap gap-5 w-full px-5">
      <form>
        <article className="">
          <Select
            name="facultyId"
            Type={"number"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={faculties.map((faculty) => [faculty.fa_name, faculty.id])}
            placeholder="فاکولته"
            label=" فیلتر فاکولته"
            setSelectedOptions={setSelectedFaculty}
            setSelected={setSelectedFac}
            resetField={resetField}
          />
        </article>
        <Select
          name="departmentId"
          Type={"number"}
          errors={errors}
          Controller={Controller}
          control={control}
          options={faculties
            .filter((fc) => fc.fa_name === selectedFaculty[0])[0]
            ?.departments.map((department) => [
              department.fa_name,
              department.id,
            ])}
          setSelected={setSelectedDep}
          placeholder="دیپارتمنت"
          label="فیلتر دیپارتمنت"
          className={!selectedFaculty && "disabled"}
        />
      </form>
      <button
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={() => reset()}
      >
        لغو فیلتر
      </button>
    </div>
  );
};

export default FilterTeacher;
