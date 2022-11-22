import React, { useEffect, useState } from "react";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import InputDate from "../form/InputDate";
import TextInput from "../form/textInput";
import SelectDep from "../teacher/Select";
import SelectGender from "./selectGender";

const AddTeacherForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  Controller,
  control,
  faculties,
  useForm,
  isOpenModal,
  setIsOpenModal,
  reset,
}) => {
  const [selectedFaculty, setSelectedFaculty] = useState("");

  useEffect(() => {
    reset();
  }, [isOpenModal, reset]);
  return (
    <article className="w-full">
      <FormBorder label={"اضافه کردن استاد"}>
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
          />
          <Input
            register={register}
            errors={errors}
            dir="ltr"
            label="نام استاد (انگلیسی)"
            name="en_name"
            type="text"
          />
          <SelectDep
            name="gender"
            Type={"string"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={[
              ["آقا", "male"],
              ["خانم", "female"],
            ]}
            placeholder="جنسیت"
            setSelectedOptions={setSelectedFaculty}
            reset={reset}
          />
          <SelectDep
            name="facultyId"
            Type={"string"}
            Controller={Controller}
            control={control}
            errors={errors}
            options={faculties.map((faculty) => [faculty.fa_name, faculty.id])}
            placeholder="فاکولته"
            setSelectedOptions={setSelectedFaculty}
            reset={reset}
          />
          <SelectDep
            name="departmentId"
            Type={"string"}
            errors={errors}
            Controller={Controller}
            control={control}
            options={faculties
              .filter((fc) => fc.fa_name === selectedFaculty[0])[0]
              ?.departments.map((department) => [
                department.fa_name,
                department.id,
              ])}
            placeholder="دیپارتمنت"
            className={!selectedFaculty && "disabled"}
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
          <div className="flex gap-5 justify-end w-full">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpenModal(false)}
            >
              لغو
            </button>
            <button
              type={"submit"}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              تایید
            </button>
          </div>
        </form>
      </FormBorder>
    </article>
  );
};

export default AddTeacherForm;
