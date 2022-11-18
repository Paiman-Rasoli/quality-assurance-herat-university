import React from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Modal from "../modal";

const TeacherModal = ({
  isOpenTeacherModal,
  setIsOpenTeacherModal,
  teacher,
  setIsOpenDeleteModal,
  setIsOpenUpdateModal,
}) => {
  // console.log("teacher", teacher);
  if (!teacher) return <div>loading...</div>;
  else
    return (
      <Modal isOpen={isOpenTeacherModal} setIsOpen={setIsOpenTeacherModal}>
        <article className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-right align-middle shadow-xl transition-all">
          <div className="w-full bg-slate-200 px-6 py-2 flex justify-between items-center">
            <button onClick={() => setIsOpenTeacherModal(false)}>
              <XCircleIcon className="h-6 w-6" />
            </button>
            <h3>مشخصات استاد</h3>
          </div>
          <div className="p-6 grid grid-cols-8 w-full gap-3">
            <div className="col-span-3">
              <li>آیدی</li>
              <li>نام و تخلص</li>
              <li>جندر</li>
              <li>حالت</li>
              <li>نوعیت</li>
              <li>فاکولته</li>
              <li>دیپارتمنت</li>
              <li>شرح حال</li>
            </div>
            <ul className="col-span-5">
              <li>{teacher.id}</li>
              <li>{teacher.fa_name}</li>
              <li>{teacher.gender}</li>
              <li>{teacher.state}</li>
              <li>{teacher.type}</li>
              <li>{teacher?.department.fa_name}</li>
              <li>{teacher?.department.faculty.fa_name}</li>
              <li>{teacher.des}</li>
            </ul>
          </div>
          <div className="w-full bg-slate-200 px-6 py-2 flex justify-around items-center">
            <button
              onClick={() => setIsOpenUpdateModal(true)}
              className="h-full flex items-center"
            >
              <PencilSquareIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsOpenDeleteModal(true)}
              className="h-full flex items-center"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </article>
      </Modal>
    );
};

export default TeacherModal;
