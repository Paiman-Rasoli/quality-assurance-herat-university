import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";

import Loading from "../components/loading";
import { login } from "../services/auth";
import { useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";

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

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await login(data);
    if (res) {
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("username", data.name);
        sessionStorage.setItem("data", data);
        navigate("/dashboard");
      } else {
        toast.error("نام کاربری و یا رمز عبور اشتباه است");
      }
      setLoading(false);
    }
  };

  return (
    <section className="relative grid place-content-center font-vazirBold h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid justify-items-center gap-5 border-2 transition-all duration-200 ease-out rounded-xl p-5 shadow-inner"
      >
        <div>ورود به حساب کاربری</div>
        <div className="grid gap-2">
          <label htmlFor="username">نام کاربری</label>
          <div>
            <input
              type="text"
              {...register("username")}
              className="border-2 border-[#1E408E] p-1 rounded"
            />
            {errors?.["username"] ? (
              <p className="text-red-500">{errors?.["username"].message}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="password">رمز عبور</label>
          <div>
            <input
              type="password"
              {...register("password")}
              className="border-2 border-[#1E408E] p-1 rounded"
            />
            {errors?.["password"] && (
              <p className="text-red-500">{errors?.["password"].message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end px-20">
          <button
            type={"submit"}
            className="px-5 py-2 rounded-sm text-white bg-[#1E408E] hover:bg-[#3672ff]"
          >
            تایید
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </section>
  );
};

export default Login;
