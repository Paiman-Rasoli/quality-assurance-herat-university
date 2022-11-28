import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "jalali-moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Paginate from "../teacher/paginate";
import FilterDep from "./filteredDeps";

const DepartmentTable = ({ departments, updateF, deleteF, setAddNewDep }) => {
  const [items, setItems] = useState(departments);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedFac, setSelectedFac] = useState(null);
  const [filteredDeps, setFilteredDeps] = useState(departments);
  useEffect(() => {
    setFilteredDeps(
      selectedFac
        ? departments?.filter(
            (department) => department.facultyId === selectedFac
          )
        : departments
    );
    setItemOffset(0);
  }, [departments, selectedFac]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap w-full justify-between gap-5">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setAddNewDep(true)}
        >
          اضافه کردن دیپارتمنت
        </button>
        <div>
          <FilterDep
            setSelectedFac={setSelectedFac}
            selectedFac={selectedFac}
          />
        </div>
      </div>
      <table className="border rounded-xl w-full table-auto border-separate lg:p-5 p-2 md:border-spacing-2 border-spacing-1">
        <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
          <tr className="divide-x-2 divide-y-2 bg-blue-200">
            <th className="font-normal text-center">شماره</th>
            <th className="font-normal text-center">نام فارسی</th>
            <th className="font-normal text-center hidden lg:block">
              نام انگلیسی
            </th>
            <th className="font-normal text-center">فاکولته</th>
            <th className="font-normal text-center">تاریخ ثبت</th>
            <th className="font-normal text-center">ویرایش/حذف</th>
          </tr>
        </thead>
        <tbody className="font-vazirBold text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
          {items.map((item, ndx) => (
            <tr
              key={ndx}
              className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
              }`}
            >
              <td className="text-center">{ndx + 1}</td>
              <td className="text-center">{item.fa_name}</td>
              <td className="text-center hidden lg:block">{item.en_name}</td>
              <td className="text-center">{item.faculty.fa_name}</td>
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
      <div>
        <Paginate
          itemsPerPage={4}
          items={filteredDeps}
          setItems={setItems}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
        />
      </div>
    </div>
  );
};

export default DepartmentTable;
