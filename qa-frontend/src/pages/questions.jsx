import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Question from "../components/form/question";
import { questions } from "../services/list";
import Loading from "../components/loading";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";

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
  const [teacherProperties, setTeacherPr] = useState({
    facolte: "انجنیری",
    department: "سیول",
    teacher: "علی",
    semesterType: "بهاری",
    semesterNumber: 2,
  });

  // useEffect(() => {
  //   (async function () {
  //     setTeacherPr(formData);
  //   })();
  // }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="grid justify-center font-vazirBold mt-10">
      <div>
        <h1 className="text-xl text-cyan-500">مشخصات استاد</h1>
        <ul className="flex gap-10">
          {Object.keys(teacherProperties).map((item, ndx) => (
            <li key={ndx}>{teacherProperties[item]}</li>
          ))}
        </ul>
      </div>
      <hr />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[45rem] w-full grid justify-items-center m-10"
      >
        {questions.map((question) => (
          <Question
            Controller={Controller}
            control={control}
            name={question.number}
            key={question.number}
            question={question.text}
            errors={errors}
          />
        ))}
        <div className="flex justify-end px-20 w-full">
          <button
            type={"submit"}
            className="rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium sm:flex-1 text-white bg-cyan-600 hover:bg-cyan-700"
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
