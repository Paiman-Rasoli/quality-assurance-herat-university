import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormBorder from "../components/form/formBorder";
import * as yup from "yup";
import moment from "jalali-moment";

import Loading from "../components/loading";
import Input from "../components/form/input";
import InputDate from "../components/form/InputDate";
import useFetch from "../hooks/useFetch";
import { httpPostFaculties } from "../services/requests";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteFaculty } from "../services/facultyService";
import { toast } from "react-toastify";
import DeleteModal from "../components/faculty/deleteModal";
import UpdateModal from "../components/faculty/updateModal";
import AddingForm from "../components/faculty/addForm";

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

  const [isOpenDModal, setIsOpenDModal] = useState(false);
  const [isOpenUModal, setIsOpenUModal] = useState(false);
  const [selecteFaculty, setSelectedFaculty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addNew, setAddNew] = useState(false);

  const deleteF = async (data) => {
    setIsOpenDModal(!isOpenDModal);
    setSelectedFaculty(data);
  };
  const updateF = async (data) => {
    setIsOpenUModal(!isOpenUModal);
    setSelectedFaculty(data);
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
        isOpen={isOpenDModal}
        setIsOpen={setIsOpenDModal}
        title={"حذف فاکولته"}
        refetch={refetch}
        text={
          <p className="font-vazirBold">
            آیا مطمین هستید که میخواهید فاکولته{" "}
            <span className="text-red-400">{selecteFaculty.fa_name}</span> را
            حذف کنید
          </p>
        }
        confirmText={"تایید"}
        denyText={"لغو"}
        faculty={selecteFaculty}
      />
      <UpdateModal
        schema={schema}
        setLoading={setLoading}
        isOpen={isOpenUModal}
        setIsOpen={setIsOpenUModal}
        title={"ویرایش فاکولته"}
        refetch={refetch}
        confirmText={"تایید"}
        denyText={"لغو"}
        faculty={selecteFaculty}
      />
      <div className="py-10">
        <table className="border rounded-3xl w-full table-auto border-separate p-5 md:p-0 md:border-spacing-5 border-spacing-1">
          <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
            <tr className="divide-x-2 divide-y-2 bg-stone-300">
              <th className="font-normal text-center">شماره</th>
              <th className="font-normal text-center">نام فارسی</th>
              <th className="font-normal text-center">نام انگلیسی</th>
              <th className="font-normal text-center">تاریخ ثبت</th>
              <th className="font-normal text-center">ویرایش/حذف</th>
            </tr>
          </thead>
          <tbody className="font-vazirBold text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
            {faculties?.map((item, ndx) => (
              <tr
                key={item.en_name}
                className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                  ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
                }`}
              >
                <td className="text-center">{ndx + 1}</td>
                <td className="text-center">{item.fa_name}</td>
                <td className="text-center">{item.en_name}</td>
                <td className="text-center">
                  {moment(item.date, "YYYY/MM/DD")
                    .locale("fa")
                    .format("YYYY/MM/DD")}
                </td>
                <td className="text-center items-center flex justify-around">
                  <button onClick={() => updateF(item)}>
                    <ArrowPathIcon className="h-6 w-6" />
                  </button>
                  <button onClick={() => deleteF(item)}>
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!addNew ? (
        <div className="">
          <button
            className="btnS1 px-5 py-2 rounded-sm text-white shadow-md transition-all bg-[#1E408E] ring-offset-2 focus:ring-cyan-300 focus:ring-2"
            onClick={() => setAddNew(true)}
          >
            اضافه کردن فاکولته{" "}
          </button>
        </div>
      ) : (
        <AddingForm
          schema={schema}
          setLoading={setLoading}
          addNew={addNew}
          setAddNew={setAddNew}
        />
      )}
    </section>
  );
};

export default Faculty;
