import { Dialog, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { httpPutFaculties } from "../../services/requests";
import { httpPutTeacher } from "../../services/teacherServices";
import SelectInput from "../faculty/select";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";
import TextInput from "../form/textInput";
import Select from "./Select";

export default function UpdateModal({
  isOpen,
  setIsOpen,
  title,
  schema,
  confirmText,
  denyText,
  refetch,
  teacher,
  setLoading,
  faculties,
}) {
  const [data, setData] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  console.log("teacher", teacher);
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await httpPutTeacher({
      id: data.id,
      fa_name: data.fa_name,
      en_name: data.en_name,
      des: data.des,
      gender: data.gender,
      state: data.state,
      type: data.type,
    });
    console.log("put", res);
    if (res) {
      refetch();
      setLoading(false);
    }
    closeModal();
  };

  return (
    <article className="w-full">
      <FormBorder label={"ویرایش استاد"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام استاد (فارسی)"
            name="fa_name"
            type="text"
            defaultValue={teacher.fa_name}
          />
          <Input
            register={register}
            errors={errors}
            dir="ltr"
            label="نام استاد (انگلیسی)"
            name="en_name"
            type="text"
            defaultValue={teacher.en_name}
          />
          <Input
            register={register}
            errors={errors}
            label="حالت"
            name="state"
            type="text"
            placeholder="مثلا: فعال"
            defaultValue={teacher.state}
          />
          <Select
            name="gender"
            Type={"string"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={[
              ["آقا", "male"],
              ["خانم", "female"],
            ]}
            reset={reset}
            defaultValue={
              teacher.gender === "male" ? ["آقا", "male"] : ["خانم", "female"]
            }
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
          <TextInput
            register={register}
            errors={errors}
            label="شرح حال"
            name="des"
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
            defaultValue={new Date(teacher.date)}
          />

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              {denyText}
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              // onClick={() => confirmUpdate(department)}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </FormBorder>
    </article>
  );
}
