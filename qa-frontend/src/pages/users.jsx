import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import * as yup from "yup";
import moment from "jalali-moment";

import useFetch from "../hooks/useFetch";
import Loading from "../components/loading";
import Modal from "../components/modal";
import DeleteModal from "../components/users/deleteModal";
import UpdateUser from "../components/users/updateModal";

const schema = yup.object({
  name: yup.string().required("نام تان را بنویسید"),
  username: yup.string().required("نام کاربری تان را بنویسید"),
  password: yup
    .string()
    .min(6, "رمز عبورباید  حداقل ۶ کاراکتر باشد")
    .required("رمز عبور تان را بنویسید"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "رمز عبور تان را با دقت وارد نمایید "),
  faculty: yup.number().nullable().required("فاکولته تان را انتخاب نمایید"),
});

const Users = () => {
  const [loadingUser, setLoading] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { data: users, loading, refetch, error } = useFetch("auth/users");

  console.log(users);

  const updateUser = (data) => {
    setSelectedUser(data);
    setIsOpenUpdateModal(true);
  };
  const deleteUser = (data) => {
    setSelectedUser(data);
    setIsOpenDeleteModal(true);
  };

  if (loading || loadingUser) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <div className="py-10">
        <table className="border rounded w-full border-separate md:border-spacing-5 border-spacing-1">
          <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
            <tr className={`divide-x-2 divide-y-2 bg-stone-300`}>
              <th className="font-normal text-center">آی دی</th>
              <th className="font-normal text-center">نام</th>
              <th className="font-normal text-center">نام کاربری</th>
              <th className="font-normal text-center">فاکولته</th>
              <th className="font-normal text-center">حالت</th>
              <th className="font-normal text-center">تاریخ</th>
              <th
                scope="col"
                className="p-2 lg:p-4 text-right font-semibold text-gray-900 sm:pl-6"
              >
                ویرایش/حذف
              </th>
            </tr>
          </thead>
          <tbody className="font-vazirBold text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
            {users?.map((item, ndx) => (
              <tr
                key={ndx}
                className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                  ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
                }  ${item.is_super_admin && "bg-green-300"}`}
              >
                <td className="text-center">{item?.id}</td>
                <td className="text-center">{item?.name}</td>
                <td className="text-center">{item?.userName}</td>
                <td className="text-center">{item?.faculty?.fa_name}</td>
                <td className="text-center">{item?.status}</td>
                <td className="text-center">
                  {moment(item?.createdAt, "YYYY/MM/DD")
                    .locale("fa")
                    .format("YYYY/MM/DD")}
                </td>
                <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                  <div className="flex justify-around">
                    <button
                      onClick={() => updateUser(item)}
                      className="h-full flex items-center hover:text-black hover:scale-105"
                    >
                      <PencilSquareIcon className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => deleteUser(item)}
                      className="h-full flex items-center hover:text-black group"
                    >
                      <TrashIcon className="h-6 w-6  group-hover:scale-105" />
                    </button>
                  </div>
                </td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpenUpdateModal} setIsOpen={setIsOpenUpdateModal}>
        <UpdateUser
          isOpen={isOpenUpdateModal}
          setIsOpen={setIsOpenUpdateModal}
          schema={schema}
          setLoading={setLoading}
          title={"ویرایش فاکولته"}
          refetch={refetch}
          confirmText={"تایید"}
          denyText={"لغو"}
          user={selectedUser}
        />
      </Modal>
      {selectedUser && (
        <DeleteModal
          isOpen={isOpenDeleteModal}
          setIsOpen={setIsOpenDeleteModal}
          title={"حذف فاکولته"}
          refetch={refetch}
          user={selectedUser}
        />
      )}
    </section>
  );
};

export default Users;
