import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import { httpPostDepartments } from "../services/requests";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import UpdateModal from "../components/department/updateModal";
import DeleteModal from "../components/department/deleteModal";
import Modal from "../components/modal";
import AddDepartmentForm from "../components/department/addform";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Teachers = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    loading: laodingdata,
    data: teachers,
    error,
    refetch,
  } = useFetch("teacher");

  const { data: faculties } = useFetch("faculty");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await httpPostDepartments({
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

  const deleteF = async (data) => {
    console.log("delete f", data);
    setSelectedDepartment(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    setSelectedDepartment(data);
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  if (laodingdata || loading) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  console.log("teachers, ", teachers);

  return (
    <section className="font-vazirBold p-10 w-full">
      <DeleteModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        title={"حذف دیپارتمنت"}
        refetch={refetch}
        text={
          <span className="font-vazirBold">
            آیا مطمین هستید که میخواهید دیپارتمنت{" "}
            <span className="text-red-400">{selectedDepartment.fa_name}</span>{" "}
            را حذف کنید
          </span>
        }
        confirmText={"تایید"}
        denyText={"لغو"}
        department={selectedDepartment}
      />
      <UpdateModal
        schema={schema}
        setLoading={setLoading}
        isOpen={isOpenUpdateModal}
        setIsOpen={setIsOpenUpdateModal}
        title={"ویرایش دیپارتمنت"}
        refetch={refetch}
        confirmText={"تایید"}
        denyText={"لغو"}
        department={selectedDepartment}
        faculties={faculties}
      />
      <Modal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        body={
          <AddDepartmentForm
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
        }
      />
      <div className="pb-10">
        <table className="border rounded-xl w-full table-auto border-separate p-5 md:p-0 md:border-spacing-5 border-spacing-1">
          <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
            <tr className="divide-x-2 divide-y-2 bg-stone-300">
              <th className="font-normal text-center">آیدی</th>
              <th className="font-normal text-center">نام فارسی</th>
              <th className="font-normal text-center hidden lg:block">
                نام انگلیسی
              </th>
              <th className="font-normal text-center">فاکولته</th>
              <th className="font-normal text-center">دیپارتمنت</th>
              <th className="font-normal text-center hidden lg:block">
                تاریخ ثبت
              </th>
              <th className="font-normal text-center hidden lg:block">
                ویرایش/حذف
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
                  <td className="text-center hidden lg:flex h-full items-center">
                    <div className="w-full h-full">{item.en_name}</div>
                  </td>
                  <td className="text-center">
                    {item.department.faculty.fa_name}
                  </td>
                  <td className="text-center">{item.department.fa_name}</td>
                  <td className="text-center hidden lg:block">
                    {moment(item.date, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </td>
                  <td className="text-center hidden lg:block">
                    <div className="flex justify-around">
                      <button
                        onClick={() => updateF(item)}
                        className="h-full flex items-center"
                      >
                        <PencilSquareIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => deleteF(item)}
                        className="h-full flex items-center"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
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
          اضافه کردن دیپارتمنت{" "}
        </button>
      </div>
    </section>
  );
};

export default Teachers;