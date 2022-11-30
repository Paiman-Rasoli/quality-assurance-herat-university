import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Question from "../components/form/question";
// import { questions } from "../services/list";
import Loading from "../components/loading";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import useFetch from "../hooks/useFetch";

const schema = yup.object({
  q1: yup
    .string()
    .required("لطفا پاسخ مورد نظرتان را انتخاب نمایید ")
    .nullable(),
});

const Questions = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const { teacher } = formData;
  const {
    loading: laodingdata,
    data: questions,
    error,
  } = useFetch("question/active");
  // console.log(questions);
  // useEffect(() => {
  //   (async function () {
  //     setTeacherPr(formData);
  //   })();
  // }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "🤔😀");
    // setLoading(true);
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section className="grid justify-center font-vazirBold text-gray-700 mt-10">
      <div>
        <h1 className="text-xl my-5">مشخصات فورم</h1>
        <ul className="flex gap-10">
          <li className="grid gap-5">
            <span>استاد</span>
            <span>{teacher.fa_name}</span>
          </li>
          <li className="grid gap-5">
            <span>مضمون</span>
            <span>{formData.subject.name}</span>
          </li>
          <li className="grid gap-5">
            <span>سمستر</span>
            <div>
              <span>{formData.semester}</span> -{" "}
              <span>{formData.semester_type}</span>
            </div>
          </li>
        </ul>
      </div>
      <hr className="my-10" />
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {questions?.map((question, ndx) => (
          <Question
            Controller={Controller}
            control={control}
            name={`q${question.id}`}
            key={ndx}
            question={question.text}
            errors={errors}
          />
        ))}
        <div className="flex justify-end px-20 w-full">
          <button
            type={"submit"}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
