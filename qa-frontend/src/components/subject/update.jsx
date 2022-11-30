import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { httpPutSubject } from "../../services/subject";
import FormBorder from "../form/formBorder";
import Input from "../form/input";

const schema = yup.object({
  name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
});

export default function UpdateSubject({
  isOpen,
  setIsOpen,
  confirmText,
  denyText,
  refetch,
  subject,
  setLoading,
}) {
  const [data, setData] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setData(subject);
    reset();
  }, [subject, isOpen, reset, setIsOpen]);

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await httpPutSubject({
      id: subject.id,
      name: data.name,
    });
    // console.log(res, "res put");
    if (res) {
      refetch();
      setLoading(false);
    }
    closeModal();
  };

  return (
    <article className="w-full">
      <FormBorder label={"ویرایش مضمون"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid min-w-full gap-3"
        >
          <Input
            register={register}
            errors={errors}
            label="نام مضمون"
            name="name"
            type="text"
            defaultValue={data.name}
          />

          <div className="mt-4 flex gap-3">
            <button
              type="reset"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={closeModal}
            >
              {denyText}
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              {confirmText}
            </button>
          </div>
        </form>
      </FormBorder>
    </article>
  );
}
