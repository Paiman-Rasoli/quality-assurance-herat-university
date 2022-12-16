import moment from "jalali-moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/loading";
import { GetUsers } from "../services/auth";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await GetUsers();
      const result = await res.json();
      console.log(result, "users");
      setUsers(result);
    })();
  }, []);

  if (users.length < 1) return <Loading />;

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <div className="py-10">
        <table className="border rounded w-full border-separate md:border-spacing-5 border-spacing-1">
          <thead className="divide-x-2 divide-y-2 divide-x-reverse divide-y-reverse font-vazirBold text-base">
            <tr className="divide-x-2 divide-y-2 bg-stone-300">
              <th className="font-normal text-center">آی دی</th>
              <th className="font-normal text-center">نام</th>
              <th className="font-normal text-center">نام کاربری</th>
              <th className="font-normal text-center">فاکولته</th>
              <th className="font-normal text-center">تاریخ</th>
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
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.userName}</td>
                <td className="text-center">{item?.faculty?.fa_name}</td>
                <td className="text-center">
                  {moment(item?.createdAt, "YYYY/MM/DD")
                    .locale("fa")
                    .format("YYYY/MM/DD")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
