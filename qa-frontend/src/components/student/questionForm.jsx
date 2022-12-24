import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { httpPostAnswres } from "../../services/evalution-form";
import Loading from "../loading";
import Question from "./question";
import { ToastMsg } from "../TaostMsg";
import Modal from "../modal";

const QuestionForm = ({ formId }) => {
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [answers, setAnswers] = useState(null);
  const navigate = useNavigate();

  const {
    loading: laodingdata,
    data: questions,
    error,
  } = useFetch("question/active");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = async (data) => {
    setLoading(true);
    const responses = {};
    // console.log(data, responses, "🤔😀");
    Object.entries(data)
      .filter((item) => item[0] !== "suggestion")
      .map((item) => (responses[item[0]] = item[1]));

    const res = await httpPostAnswres({
      formId,
      response: { ...responses },
      suggestion: data["suggestion"],
    });
    // console.log(await res.json(), "✔✔");
    if (res) {
      res.ok
        ? toast.success(
            <ToastMsg text="تشکر از اشتراک شما در این همه پرسی" />,
            {
              position: "top-center",
            }
          ) && navigate("/")
        : toast.warning(
            <ToastMsg
              text={"متاسفانه پاسخ های شما ثبت نشد. لطفا دوباره تلاش نمایید"}
            />,
            {
              position: "top-center",
            }
          );
      setLoading(false);
    }
  };

  const submtHandler = (data) => {
    setConfirmModal(true);
    setAnswers(data);
  };

  const onSubmit = () => {
    Submit(answers);
    setConfirmModal(false);
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section>
      {confirmModal && (
        <Modal isOpen={confirmModal} setIsOpen={setConfirmModal}>
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-cyan-800 p-6 text-right align-middle shadow-xl transition-all">
            <div className="mt-2">
              <p className="text-sm text-white">
                آیا از پاسخ های تان اطمینان دارید؟
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setConfirmModal(false)}
              >
                لغو{" "}
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={onSubmit}
              >
                تایید{" "}
              </button>
            </div>
          </div>
        </Modal>
      )}
      <form onSubmit={handleSubmit(submtHandler)} className="grid font-vazir">
        {questions?.map((question, ndx) => (
          <div
            className={`p-3 text-white ${
              ndx % 2 === 0 ? "bg-cyan-800" : "bg-cyan-700"
            }`}
          >
            <Question
              Controller={Controller}
              control={control}
              name={`${question.id}`}
              key={ndx}
              ndx={ndx}
              question={question.text}
              errors={errors}
            />
          </div>
        ))}
        <article className="bg-cyan-700 text-white px-3">
          <label htmlFor="suggestion">
            لطفا نظرات و پینشهادات سازنده تانرا جهت بهبود کیفیت تدریس با ما شریک
            سازید
          </label>
          <div className="flex justify-center mb-2">
            <textarea
              className="w-full rounded border-2 border-cyan-500 bg-cyan-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              {...register("suggestion")}
              dir="rtl"
              id="suggestion"
              rows="4"
            ></textarea>
          </div>
        </article>
        <div className="flex justify-end p-10 w-full bg-cyan-800">
          <button
            type={"submit"}
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-cyan-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            تایید
          </button>
          {loading && <Loading />}
        </div>
      </form>
    </section>
  );
};

export default QuestionForm;
