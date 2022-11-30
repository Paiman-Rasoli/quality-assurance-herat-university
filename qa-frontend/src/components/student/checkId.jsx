import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { httpGetForm } from "../../services/form";

const schema = yup.object({
  id: yup.string().required("لطفا آی دی را وارد نمایید"),
});

const CheckId = ({ setData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (e) => {
    console.log(e);
    const res = await httpGetForm(e.id);
    console.log(res);
    if (res) {
      res.ok
        ? setData(await res.json())
        : toast.warning("فورم مورد نظر یافت نشد");
    }
  };

  return (
    <main className="font-vazirBold my-10 px-5">
      <section className="flex justify-center px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <label htmlFor="id">
            <h5>لطفا آیدی فورم مورد نظرتان را وارد نمایید</h5>
          </label>
          <div>
            <input
              type="text"
              dir="ltr"
              lang="en"
              autoFocus
              {...register("id")}
              className="w-full font-bold uppercase font-sans border-2 border-[#1E408E] text-[#1E408E] p-1 rounded"
              placeholder="ID"
            />
            {errors?.["id"] && (
              <p className="text-red-500">{errors?.["id"].message}</p>
            )}
          </div>
          <div className="flex justify-end px-20">
            <button
              type={"submit"}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              تایید
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default CheckId;
