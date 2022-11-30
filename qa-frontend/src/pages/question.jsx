import React, { useState } from "react";
import * as yup from "yup";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import DeleteModal from "../components/subject/deleteModal";
import Modal from "../components/modal";
import UpdateSubject from "../components/subject/update";
import QuestionTable from "../components/question/table";
import AddQuestionForm from "../components/question/addForm";

const schema = yup.object({
  text: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  status: yup.boolean().required("لطفا این قسمت را تکمیل نمایید"),
});

const Question = () => {
  const {
    loading: laodingdata,
    data: questions,
    error,
    refetch,
  } = useFetch("question");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteF = async (data) => {
    setSelectedSubject(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    console.log("update f", data);
    setSelectedSubject(data);
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  //   console.log(subjects);

  return (
    <section className="font-vazirBold p-10 w-full">
      <QuestionTable
        setIsOpenModal={setIsOpenModal}
        questions={questions}
        updateF={updateF}
        deleteF={deleteF}
      />

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <AddQuestionForm
          schema={schema}
          setLoading={setLoading}
          addNew={isOpenModal}
          setAddNew={setIsOpenModal}
          refetch={refetch}
        />
      </Modal>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        title={"حذف مضمون"}
        refetch={refetch}
        text={
          <span className="font-vazirBold">
            آیا مطمین هستید که میخواهید مضمون{" "}
            <span className="text-red-400 font-vazirBlack text-lg">
              {selectedSubject.name}
            </span>{" "}
            را حذف کنید
          </span>
        }
        confirmText={"تایید"}
        denyText={"لغو"}
        subject={selectedSubject}
      />
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateSubject
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          setLoading={setLoading}
          title={"ویرایش مضمون"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          subject={selectedSubject}
        />
      </Modal>
    </section>
  );
};

export default Question;
