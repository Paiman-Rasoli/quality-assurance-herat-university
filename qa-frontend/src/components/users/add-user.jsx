import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import SelectInput from "../faculty/select";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import useFetch from "../../hooks/useFetch";

const schema = yup.object({
  name: yup.string().required("نام تان را بنویسید"),
  username: yup.string().required("نام کاربری تان را بنویسید"),
  password: yup.string().required("رمز عبور تان را بنویسید"),
  facultyId: yup.string().nullable().required("فاکولته تان را انتخاب نمایید"),
});

const AddUser = () => {
  const { data: faculties } = useFetch("faculty");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (e) => {
    console.log("register", e);
  };
  return (
    <main>
      <section>
        {" "}
        <FormBorder label={"اضافه کردن کابر جدید"}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid min-w-full gap-3"
          >
            <Input
              register={register}
              errors={errors}
              label="نام"
              name="name"
              type="text"
            />
            <Input
              register={register}
              errors={errors}
              label=" نام کاربری (ایمیل)"
              name="username"
              type="text"
              dir="ltr"
            />
            <Input
              register={register}
              errors={errors}
              label="رمز عبور"
              name="password"
              type="passwrod"
              dir="ltr"
            />
            <SelectInput
              name="facultyId"
              Type={"number"}
              Controller={Controller}
              control={control}
              errors={errors}
              options={faculties?.map((item) => [item.fa_name, item.id])}
              placeholder="فاکولته"
            />
            <div className="flex justify-end px-20">
              <button
                type={"submit"}
                className="px-5 py-2 rounded-sm text-white bg-[#1E408E] hover:bg-[#3672ff]"
              >
                تایید
              </button>
            </div>
          </form>
        </FormBorder>
      </section>
    </main>
  );
};

export default AddUser;
