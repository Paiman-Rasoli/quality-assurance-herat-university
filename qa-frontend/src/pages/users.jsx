import moment from "jalali-moment";
import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([
    {
      teacherId: 1,
      firstName: "زهرا",
      lastName: "حمیدی",
      gender: "خانم",
      faculty: "اقتصاد",
      department: "منجمنت",
      edudationLevel: "دکترا",
      date: new Date(),
    },
    {
      teacherId: 2,
      firstName: "احمد",
      lastName: "کریمی",
      gender: "آقا",
      faculty: "طب",
      department: "معالجوی",
      edudationLevel: "ماستر",
      date: new Date(),
    },
  ]);

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <div className="py-10">
        <table className="border rounded w-full border-separate md:border-spacing-5 border-spacing-1">
          <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
            <tr className="divide-x-2 divide-y-2 bg-stone-300">
              <th className="font-normal text-center">آی دی</th>
              <th className="font-normal text-center">اسم</th>
              <th className="font-normal text-center">تخلص</th>
              <th className="font-normal text-center">فاکولته</th>
              <th className="font-normal text-center">دیپارتمنت</th>
            </tr>
          </thead>
          <tbody className="font-vazirBold text-base text-black divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse">
            {users.map((item, ndx) => (
              <tr
                key={ndx}
                className={`divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse ${
                  ndx % 2 === 0 ? "bg-stone-100" : "bg-zinc-200"
                }`}
              >
                <td className="text-center">{item.teacherId}</td>
                <td className="text-center">{item.firstName}</td>
                <td className="text-center">{item.lastName}</td>
                <td className="text-center">{item.faculty}</td>
                <td className="text-center">{item.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
