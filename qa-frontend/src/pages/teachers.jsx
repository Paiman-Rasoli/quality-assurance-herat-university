import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import UpdateModal from "../components/teacher/updateModal";
import DeleteModal from "../components/teacher/deleteModal";
import Modal from "../components/modal";
import AddTeacherForm from "../components/teacher/addform";
import Teacher from "../components/teacher/teacher";
import { httpPostTeacher } from "../services/teacherServices";
import TeachersTable from "../components/teacher/table";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  state: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  type: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  gender: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  departmentId: yup
    .number()
    .nullable()
    .required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
  des: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
});

const Teachers = () => {
  const [addNewTeacher, setAddNewTeacher] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenTeacherModal, setIsOpenTeacherModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    loading: laodingdata,
    data: teachers,
    error,
    refetch,
  } = useFetch("teacher");

  const { data: faculties } = useFetch("faculty");
  const { data: departments } = useFetch("department");

  const {
    register,
    control,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { facultyId: null, departmentId: null },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("teacher data", data);
    const res = await httpPostTeacher({
      ...data,
      date: data.date.toJSON().slice(0, 10),
    });
    // console.log(res);
    if (res) {
      refetch();
      setAddNewTeacher(false);
      setLoading(false);
    }
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  // console.log("departments, ", departments);

  return (
    <section className="font-vazirBold p-10 w-full">
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        setIsOpenTeacherModal={setIsOpenTeacherModal}
        title={"حذف استاد"}
        refetch={refetch}
        text={
          <span className="font-vazirBold">
            آیا مطمین هستید که میخواهید استاد{" "}
            <span className="text-red-400">{selectedTeacher.fa_name}</span> را
            حذف کنید
          </span>
        }
        confirmText={"تایید"}
        denyText={"لغو"}
        teacher={selectedTeacher}
      />
      <Modal setLoading={setLoading} isOpen={isOpenUpdateModal}>
        <UpdateModal
          schema={schema}
          setLoading={setLoading}
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          setIsOpenTeacherModal={setIsOpenTeacherModal}
          title={"ویرایش"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          teacher={selectedTeacher}
          departments={departments}
          faculties={faculties}
        />
      </Modal>
      {addNewTeacher ? (
        <AddTeacherForm
          Controller={Controller}
          control={control}
          errors={errors}
          faculties={faculties}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          useForm={useForm}
          reset={reset}
          resetField={resetField}
          refetch={refetch}
          addNewTeacher={addNewTeacher}
          setAddNewTeacher={setAddNewTeacher}
        />
      ) : isOpenTeacherModal ? (
        <Teacher
          isOpenTeacherModal={isOpenTeacherModal}
          setIsOpenTeacherModal={setIsOpenTeacherModal}
          teacher={selectedTeacher}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          setIsOpenUpdateModal={setIsOpenUpdateModal}
        />
      ) : (
        <TeachersTable
          setAddNewTeacher={setAddNewTeacher}
          teachers={teachers}
          setSelectedTeacher={setSelectedTeacher}
          setIsOpenTeacherModal={setIsOpenTeacherModal}
        />
      )}
    </section>
  );
};

export default Teachers;
