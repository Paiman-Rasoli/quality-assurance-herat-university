import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import UpdateDepartment from "../components/department/updateDepartment";
import DeleteModal from "../components/department/deleteModal";
import Modal from "../components/modal";
import AddDepartmentForm from "../components/department/addform";
import { httpPostDepartment } from "../services/department";
import DepartmentTable from "../components/department/table";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Department = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    loading: laodingdata,
    data: departments,
    error,
    refetch,
  } = useFetch("department");

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
    const res = await httpPostDepartment({
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
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateDepartment
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
      </Modal>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
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
      </Modal>

      <DepartmentTable
        departments={departments}
        updateF={updateF}
        deleteF={deleteF}
      />
    </section>
  );
};

export default Department;
