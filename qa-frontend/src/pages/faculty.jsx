import React, { useState } from "react";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "../components/faculty/deleteModal";
import UpdateFaculty from "../components/faculty/update";
import AddFacultyForm from "../components/faculty/addForm";
import Modal from "../components/modal";

const schema = yup.object({
  fa_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  en_name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  date: yup.date().required("لطفا تاریخ مورد نظرتان را وارد نمایید"),
});

const Faculty = () => {
  const {
    loading: laodingdata,
    data: faculties,
    error,
    refetch,
  } = useFetch("faculty");

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteF = async (data) => {
    setSelectedFaculty(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    console.log("update f", data);
    setSelectedFaculty(data);
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
      <div className="pb-10">
        <table className="border rounded-xl w-full table-auto border-separate lg:p-5 p-2 md:border-spacing-2 border-spacing-1">
          <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
            <tr className="divide-x-2 divide-y-2 bg-blue-200">
              <th className="font-normal text-center">شماره</th>
              <th className="font-normal text-center">نام فارسی</th>
              <th className="font-normal text-center hidden lg:block">
                نام انگلیسی
              </th>
              <th className="font-normal text-center">تاریخ ثبت</th>
              <th className="font-normal text-center">ویرایش/حذف</th>
            </tr>
          </thead>
          <tbody className="font-vazirBold text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
            {faculties?.map((item, ndx) => (
              <tr
                key={item.en_name}
                className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse h-full items-center ${
                  ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
                }`}
              >
                <td className="text-center">{ndx + 1}</td>
                <td className="text-center">{item.fa_name}</td>
                <td className="text-center  hidden lg:block">{item.en_name}</td>
                <td className="text-center">
                  {moment(item.date, "YYYY/MM/DD")
                    .locale("fa")
                    .format("YYYY/MM/DD")}
                </td>
                <td className="text-center">
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
            ))}
          </tbody>
        </table>
      </div>

      <div className="">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setIsOpenModal(true)}
        >
          اضافه کردن فاکولته{" "}
        </button>
      </div>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <AddFacultyForm
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
        title={"حذف فاکولته"}
        refetch={refetch}
        text={
          <span className="font-vazirBold">
            آیا مطمین هستید که میخواهید فاکولته{" "}
            <span className="text-red-400">{selectedFaculty.fa_name}</span> را
            حذف کنید
          </span>
        }
        confirmText={"تایید"}
        denyText={"لغو"}
        faculty={selectedFaculty}
      />
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateFaculty
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          schema={schema}
          setLoading={setLoading}
          title={"ویرایش فاکولته"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          faculty={selectedFaculty}
        />
      </Modal>
    </section>
  );
};

export default Faculty;
