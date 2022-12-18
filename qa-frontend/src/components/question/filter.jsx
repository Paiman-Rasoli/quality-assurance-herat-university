import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useFetch from "../../hooks/useFetch";
import Loading from "../loading";
import Select from "../SelectForFilter";

const FilterQuestion = ({ selectedStatus, setSelectedStatus }) => {
  const {
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: { status: null },
  });

  console.log("1", selectedStatus, "status");

  return (
    <div className="flex flex-wrap gap-5 w-full px-5">
      <article className="">
        <Select
          name="status"
          Type={"string"}
          Controller={Controller}
          control={control}
          errors={errors}
          options={[
            ["فعال", 1],
            ["متوقف", 2],
          ]}
          placeholder="حالت"
          label="فیلتر سوالات"
          setSelected={setSelectedStatus}
          resetField={resetField}
        />
      </article>

      {selectedStatus ? (
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setSelectedStatus(null)}
        >
          لغو فیلتر
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterQuestion;
