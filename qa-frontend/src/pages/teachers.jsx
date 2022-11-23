import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import UpdateModal from "../components/teacher/updateModal";
import DeleteModal from "../components/teacher/deleteModal";
import Modal from "../components/modal";
import AddTeacherForm from "../components/teacher/addform";
import Teacher from "../components/teacher/teacher";
import { httpPostTeacher } from "../services/teacherServices";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
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
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    // setLoading(true);
    console.log("submit");
    console.log("teacher data", data);
    const res = await httpPostTeacher({
      ...data,
      date: data.date.toJSON().slice(0, 10),
    });
    console.log(res);
    if (res) {
      refetch();
      setIsOpenModal(false);
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
        title={"حذف استاد"}
        refetch={refetch}
        text={
          <span className="font-vazirBold">
            آیا مطمین هستید که میخواهید دیپارتمنت{" "}
            <span className="text-red-400">{selectedTeacher.fa_name}</span> را
            حذف کنید
          </span>
        }
        confirmText={"تایید"}
        denyText={"لغو"}
        department={selectedTeacher}
      />
      <UpdateModal
        schema={schema}
        setLoading={setLoading}
        isOpen={isOpenUpdateModal}
        setIsOpen={setIsOpenUpdateModal}
        title={"ویرایش"}
        refetch={refetch}
        confirmText={"تایید"}
        denyText={"لغو"}
        department={selectedTeacher}
        departments={departments}
        faculties={faculties}
      />
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
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
          refetch={refetch}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </Modal>
      {isOpenTeacherModal ? (
        <Teacher
          isOpenTeacherModal={isOpenTeacherModal}
          setIsOpenTeacherModal={setIsOpenTeacherModal}
          teacher={selectedTeacher}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          setIsOpenUpdateModal={setIsOpenUpdateModal}
        />
      ) : (
        <>
          <div className="pb-10">
            <table className="border rounded-xl w-full table-auto border-separate p-5 md:p-0 md:border-spacing-5 border-spacing-1">
              <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
                <tr className="divide-x-2 divide-y-2 bg-stone-300">
                  <th className="font-normal text-center">آیدی</th>
                  <th className="font-normal text-center">نام فارسی</th>
                  <th className="font-normal text-center hidden lg:grid w-full h-full place-content-center">
                    نام انگلیسی
                  </th>
                  <th className="font-normal text-center">فاکولته</th>
                  <th className="font-normal text-center">دیپارتمنت</th>
                  <th className="font-normal text-center hidden lg:grid w-full h-full place-content-center">
                    تاریخ ثبت
                  </th>
                </tr>
              </thead>
              <tbody className="font-vazirBold text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
                {teachers.map(
                  (item, ndx) => (
                    <tr
                      key={ndx}
                      className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                        ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
                      }`}
                    >
                      <td className="text-center">{item.id}</td>
                      <td className="text-center">{item?.fa_name}</td>
                      <td className="text-center hidden hidden lg:grid w-full h-full place-content-center">
                        <div className="w-full h-full">{item.en_name}</div>
                      </td>
                      <td className="text-center">
                        {item.department.faculty.fa_name}
                      </td>
                      <td className="text-center">{item.department.fa_name}</td>
                      <td className="text-center hidden lg:grid w-full h-full place-content-center">
                        {moment(item.date, "YYYY/MM/DD")
                          .locale("fa")
                          .format("YYYY/MM/DD")}
                      </td>
                      <td
                        className="text-center justify-center rounded-md border border-transparent bg-blue-100  text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
                        onClick={() => {
                          setSelectedTeacher(item);
                          setIsOpenTeacherModal(true);
                        }}
                      >
                        <button>جزئیات</button>
                      </td>
                    </tr>
                  )
                  //   console.log(item)
                )}
              </tbody>
            </table>
          </div>
          <div className="">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpenModal(true)}
            >
              اضافه کردن استاد
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Teachers;
