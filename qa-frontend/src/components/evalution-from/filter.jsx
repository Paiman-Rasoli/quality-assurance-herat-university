import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yearsForFiltring } from "../../services/list";

import Select from "../SelectForFilter";

const schema = yup.object({
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  departmentId: yup
    .number()
    .nullable()
    .required("لطفا این قسمت را تکمیل نمایید"),
  semester_type: yup
    .string()
    .required("لطفا نوعیت سمستر مورد نظرتان را انتخاب نمایید "),
  year: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const FilterForms = ({
  selectedFac,
  selectedDep,
  selectedYear,
  selectedSmstrType,
  setSelectedFac,
  setSelectedDep,
  setSelectedYear,
  setSelectedSmstrType,
  faculties,
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [cancelFilter, setCancelFilter] = useState(false);

  const {
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      facultyId: null,
      departmentId: null,
      year: null,
      semester_type: null,
    },
  });

  useEffect(() => {
    reset({
      departmentId: null,
      facultyId: null,
      setSelectedSmstrType: null,
      setSelectedYear: null,
    });
    setSelectedDep(null);
    setSelectedFac(null);
    setSelectedYear(null);
    setSelectedSmstrType(null);
  }, [cancelFilter]);

  return (
    <div className="flex flex-wrap gap-2 w-fit px-5">
      <Select
        name="year"
        Type={"number"}
        errors={errors}
        Controller={Controller}
        control={control}
        options={yearsForFiltring}
        setSelected={setSelectedYear}
        placeholder="سال"
        label="فیلتر سال"
        className={!selectedFaculty && "disabled"}
        reset={cancelFilter}
      />
      <Select
        name="semester_type"
        Type={"string"}
        errors={errors}
        Controller={Controller}
        control={control}
        options={[
          ["بهاری", "بهاری"],
          ["خزانی", "خزانی"],
        ]}
        setSelected={setSelectedSmstrType}
        placeholder="سمستر"
        reset={cancelFilter}
      />
      <Select
        name="facultyId"
        Type={"number"}
        Controller={Controller}
        control={control}
        errors={errors}
        options={faculties?.map((faculty) => [faculty.fa_name, faculty.id])}
        placeholder="فاکولته"
        label=" فیلتر فاکولته"
        setSelectedOptions={setSelectedFaculty}
        setSelected={setSelectedFac}
        resetField={resetField}
        reset={cancelFilter}
      />
      <Select
        name="departmentId"
        Type={"number"}
        errors={errors}
        Controller={Controller}
        control={control}
        options={faculties
          ?.filter((fc) => fc.fa_name === selectedFaculty[0])[0]
          ?.departments?.map((department) => [
            department.fa_name,
            department.id,
          ])}
        setSelected={setSelectedDep}
        placeholder="دیپارتمنت"
        label="فیلتر دیپارتمنت"
        className={!selectedFaculty && "disabled"}
        reset={cancelFilter}
      />

      {(selectedFac || selectedDep || selectedYear || selectedSmstrType) && (
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setCancelFilter(!cancelFilter)}
        >
          لغو فیلتر
        </button>
      )}
    </div>
  );
};

export default FilterForms;
