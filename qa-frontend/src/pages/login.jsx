import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  username: yup.string().required("نام کاربری تان را وارد نمایید"),
  password: yup.string().required("رمز عبور تان را وارد نمایید"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <section className="grid place-content-center font-vazirBold h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid justify-items-center gap-5 border-2 hover:shadow-2xl hover:-translate-y-5 hover:scale-105 shadow-xl transition-all duration-200 ease-out rounded-xl p-5"
      >
        <div>ورود به حساب کاربری</div>
        <div className="grid gap-2">
          <label htmlFor="username">نام کاربری</label>
          <input
            type="text"
            {...register("username")}
            className="border-2 border-[#1E408E] p-1 rounded"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">رمز عبور</label>
          <input
            type="password"
            {...register("password")}
            className="border-2 border-[#1E408E] p-1 rounded"
          />
        </div>
        <div className="flex justify-end px-20">
          <button
            type={"submit"}
            className="px-5 py-2 rounded-full text-white bg-[#1E408E]"
          >
            تایید
          </button>
          {loading && <Loading />}
        </div>
      </form>
    </section>
  );
};

export default Login;
