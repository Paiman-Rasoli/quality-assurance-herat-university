import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Question from "../components/form/question";
import { questions } from "../services/list";
import Loading from "../components/loading";
import { useState } from "react";

const schema = yup.object({
  q1: yup
    .string()
    .required("لطفا پاسخ مورد نظرتان را انتخاب نمایید ")
    .nullable(),
  q2: yup
    .string()
    .required("لطفا پاسخ مورد نظرتان را انتخاب نمایید ")
    .nullable(),
  q3: yup
    .string()
    .required("لطفا پاسخ مورد نظرتان را انتخاب نمایید ")
    .nullable(),
  q4: yup
    .string()
    .required("لطفا پاسخ مورد نظرتان را انتخاب نمایید ")
    .nullable(),
  q5: yup
    .string()
    .required("لطفا پاسخ مورد نظرتان را انتخاب نمایید ")
    .nullable(),
});

const Questions = ({ formData }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data, formData);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="grid justify-center font-vazirBold">
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((question) => (
          <Question
            name={question.number}
            key={question.number}
            register={register}
            question={question.text}
            errors={errors}
          />
        ))}
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

export default Questions;
