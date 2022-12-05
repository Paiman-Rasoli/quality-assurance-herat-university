import React, { useState, useEffect, useMemo } from "react";
import moment from "jalali-moment";

import Paginate from "./paginate";
import Teacher from "./teacher";
import FilterTeacher from "./filterTeacher";

const TeachersTable = ({
  setAddNewTeacher,
  teachers,
  faculties,
  departments,
  selectedTeacher,
  setSelectedTeacher,
  setIsOpenTeacherModal,
  isOpenTeacherModal,
  setIsOpenDeleteModal,
  setIsOpenUpdateModal,
}) => {
  const [items, setItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedDep, setSelectedDep] = useState(null);
  const [selectedFac, setSelectedFac] = useState(null);
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  useEffect(() => {
    setFilteredTeachers(
      selectedFac
        ? teachers?.filter((teacher) =>
            selectedDep
              ? teacher.departmentId === selectedDep &&
                teacher.department.facultyId === selectedFac
              : teacher.department.facultyId === selectedFac
          )
        : teachers
    );
    setItemOffset(0);
  }, [selectedDep, selectedFac, teachers]);

  useMemo(() => {
    setSelectedDep(null);
  }, [selectedFac]);

  // useMemo(() => {
  //   setItemOffset(0);
  // }, [filteredTeachers]);

  return (
    <>
      {isOpenTeacherModal && (
        <Teacher
          isOpenTeacherModal={isOpenTeacherModal}
          setIsOpenTeacherModal={setIsOpenTeacherModal}
          teacher={selectedTeacher}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          setIsOpenUpdateModal={setIsOpenUpdateModal}
        />
      )}
      <div className={isOpenTeacherModal ? `hidden` : ""}>
        <article className="flex flex-wrap w-full justify-between gap-5">
          <div className="fixed left-0 bottom-0 mb-10 p-5 z-10">
            <button
              className="h-16 w-16 grid place-content-center shadow-black shadow-lg justify-center rounded-full border border-transparent bg-blue-100 p-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setAddNewTeacher(true)}
            >
              استاد جدید
            </button>
          </div>
          <div>
            <FilterTeacher
              faculties={faculties}
              departments={departments}
              selectedFac={selectedFac}
              setSelectedDep={setSelectedDep}
              setSelectedFac={setSelectedFac}
            />
          </div>
        </article>
        <div className="pt-10">
          <table className="border rounded-xl w-full table-auto border-separate lg:p-5 p-2 lg:border-spacing-2 border-spacing-1">
            <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
              <tr className="divide-x-2 divide-y-2 bg-blue-200">
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
            <tbody className="font-vazir text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
              {items.map(
                (item, ndx) => (
                  <tr
                    key={ndx}
                    className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                      ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
                    }`}
                  >
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item?.fa_name}</td>
                    <td className="text-center hidden lg:grid w-full h-full place-content-center">
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
          <Paginate
            itemsPerPage={2}
            items={filteredTeachers}
            setItems={setItems}
            itemOffset={itemOffset}
            setItemOffset={setItemOffset}
          />
        </div>
      </div>
    </>
  );
};

export default TeachersTable;
