import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import { httpPostFaculties } from "../../services/requests";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";

const AddingForm = ({ schema, setLoading, addNew, setAddNew }) => {
  const {
    loading: laodingdata,
    data: faculties,
    error,
    refetch,
  } = useFetch("faculty");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);

    const res = await httpPostFaculties({
      ...data,
      date: data.date.toJSON().slice(0, 10),
    });
    console.log(res);
    if (res) {
      refetch();
      setLoading(false);
      setAddNew(false);
    }
  };

  useEffect(() => {
    reset();
  }, [addNew, reset]);

  return (
    <article className="w-full">
      <FormBorder label={"ایجاد فاکولته"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام فاکولته (فارسی)"
            name="fa_name"
            type="text"
          />
          <Input
            register={register}
            errors={errors}
            dir={"ltr"}
            label="نام فاکولته(انگلیسی)"
            name="en_name"
            type="text"
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
          />

          <div className="flex gap-5 justify-end w-full">
            <button
              className="btnS1 px-5 py-2 rounded-sm text-white shadow-md transition-all bg-[#1E408E] ring-offset-2 focus:ring-cyan-300 focus:ring-2"
              onClick={() => setAddNew(false)}
            >
              لغو
            </button>
            <button
              type={"submit"}
              className="btnS1 px-5 py-2 rounded-sm text-white shadow-md transition-all bg-[#1E408E] ring-offset-2 focus:ring-cyan-300 focus:ring-2"
            >
              تایید
            </button>
          </div>
        </form>
      </FormBorder>
    </article>
  );
};

export default AddingForm;
