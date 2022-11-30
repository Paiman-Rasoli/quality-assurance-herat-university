import React, { useState } from "react";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "../components/subject/deleteModal";
import Modal from "../components/modal";
import AddSubjectForm from "../components/subject/addForm";
import UpdateSubject from "../components/subject/update";

const schema = yup.object({
  name: yup.string().required("لطفا این قسمت را تکمیل نمایید"),
  facultyId: yup.number().nullable().required("لطفا این قسمت را تکمیل نمایید"),
  departmentId: yup
    .number()
    .nullable()
    .required("لطفا این قسمت را تکمیل نمایید"),
});

const Subject = () => {
  const {
    loading: laodingdata,
    data: subjects,
    error,
    refetch,
  } = useFetch("subject");

  const { data: faculties } = useFetch("faculty");

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
      <div className="mb-10">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setIsOpenModal(true)}
        >
          اضافه کردن مضمون{" "}
        </button>
      </div>
      <div className="p-5 rounded-xl bg-gray-100">
        <h4 className="font-vazirBlack text-3xl">لیست مضامین</h4>
        <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-5 text">
          <table className="min-w-full divide-y divide-gray-300" dir="rtl">
            <thead dir="rtl" className="font-vazirBold text-base">
              <tr className="divide-x divide-x-reverse divide-gray-200">
                <th
                  scope="col"
                  className="py-3.5 pr-4 pl-4 text-right font-semibold text-gray-900 sm:pr-6"
                >
                  شماره
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  نام فارسی
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  فاکولته
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  دیپارتمنت
                </th>

                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  تاریخ ثبت
                </th>
                <th
                  scope="col"
                  className="py-3.5 p-4 pr-4 text-right font-semibold text-gray-900 sm:pl-6"
                >
                  ویرایش/حذف
                </th>
              </tr>
            </thead>
            <tbody dir="rtl" className="divide-y divide-gray-200 bg-white">
              {subjects?.map((item, ndx) => (
                <tr
                  key={item.id}
                  className="divide-x divide-x-reverse divide-gray-200"
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-4  font-medium text-gray-900 sm:pr-6">
                    {ndx + 1}
                  </td>
                  <td className="whitespace-nowrap p-4  text-gray-500">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap p-4  text-gray-500">
                    {item.department.faculty.fa_name}
                  </td>
                  <td className="whitespace-nowrap p-4  text-gray-500">
                    {item.department.fa_name}
                  </td>

                  <td className="whitespace-nowrap p-4  text-gray-500">
                    {moment(item.date, "YYYY/MM/DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </td>
                  <td className="whitespace-nowrap p-4  text-gray-500">
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
      </div>

      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <AddSubjectForm
          schema={schema}
          setLoading={setLoading}
          addNew={isOpenModal}
          setAddNew={setIsOpenModal}
          refetch={refetch}
          faculties={faculties}
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

export default Subject;
