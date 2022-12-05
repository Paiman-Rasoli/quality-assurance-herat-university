import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();

  const {
    loading: laodingdata,
    data: questions,
    error,
  } = useFetch("question/active");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Submit = async (data) => {
    setLoading(true);
    // console.log(data, "🤔😀");
    const res = await httpPostAnswres({ formId, response: data });
    // console.log(await res.json(), "✔✔");
    if (res) {
      res.ok
        ? toast.success(
            <ToastMsg text="تشکر از اشتراک شما در این همه پرسی" />,
            {
              position: "bottom-center",
            }
          ) && navigate("/")
        : toast.warning(
            <ToastMsg
              text={"متاسفانه پاسخ های شما ثبت نشد. لطفا دوباره تلاش نمایید"}
            />,
            {
              position: "bottom-center",
            }
          );
      setLoading(false);
    }
  };
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [answers, setAnswers] = useState(null);

  const submtHandler = (data) => {
    setConfirmModal(true);
    setAnswers(data);
  };

  useEffect(() => {
    if (confirm) Submit(answers);
  }, [confirm]);

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section className="px-5">
      {confirmModal && (
        <Modal isOpen={confirmModal} setIsOpen={setConfirmModal}>
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
            <div className="mt-2">
              <p className="text-sm text-gray-500">
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
                onClick={() => setConfirm(true)}
              >
                تایید{" "}
              </button>
            </div>
          </div>
        </Modal>
      )}
      <form onSubmit={handleSubmit(submtHandler)} className="grid font-vazir">
        {questions?.map((question, ndx) => (
          <Question
            Controller={Controller}
            control={control}
            name={`${question.id}`}
            key={ndx}
            question={question.text}
            errors={errors}
          />
        ))}

        <div className="flex justify-end p-10 w-full">
          <button
            type={"submit"}
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
