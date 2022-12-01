import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import useFetch from "../../hooks/useFetch";

import { registerUser } from "../../services/auth";
import SelectInput from "../faculty/select";
import FormBorder from "../form/formBorder";
import Input from "../form/input";
import { toast } from "react-toastify";
import Loading from "../loading";

const schema = yup.object({
  name: yup.string().required("نام تان را بنویسید"),
  username: yup.string().required("نام کاربری تان را بنویسید"),
  password: yup.string().required("رمز عبور تان را بنویسید"),
  faculty: yup.string().nullable().required("فاکولته تان را انتخاب نمایید"),
});

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const { data: faculties } = useFetch("faculty");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log("register", data);
    setLoading(true);
    try {
      const res = await registerUser(data);
      console.log(res, "res");

      setLoading(false);
      if (res?.ok) {
        toast.success("حساب کاربری موفقانه ایجاد شد");
        const data = await res.json();
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("username", data.name);
        sessionStorage.setItem("data", data);
        // navigate("/dashboard");
      } else {
        toast.error("اوپس..  متاسفانه حساب کاربری مورد نظر ایجاد نشد");
      }
    } catch (error) {
      toast.error("لطفا ارتباط با سرور را چک نمایید");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <section className="w-full">
        {" "}
        <FormBorder label={"اضافه کردن کابر جدید"}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid min-w-full gap-3 p-5"
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
              name="faculty"
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
      {loading && <Loading />}
    </main>
  );
};

export default AddUser;
