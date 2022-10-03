import React from "react";
import { facolte } from "../services/list";

const Student = () => {
  return (
    <div className="p-10 grid justify-center">
      <h1 className="text-center text-5xl font-vazirBold">
        سیستم تضمین کیفیت دانشگاه هرات
      </h1>
      <h3 className="text-center text-3xl font-vazirBold mt-5">
        فورم ارزیابی اصلاح تدریس
      </h3>
      <form className="grid justify-center my-10 border border-black rounded gap-5">
        <select name="facolte" id="facolte">
          <option value="null" hidden>
            فاکولته
          </option>
          {facolte.map((fc, ndx) => (
            <option value={fc} key={ndx}>
              {fc}
            </option>
          ))}
        </select>
        <select name="facolte" id="facolte">
          <option value="null" hidden>
            دیپارتمنت
          </option>
          {facolte.map((fc, ndx) => (
            <option value={fc} key={ndx}>
              {fc}
            </option>
          ))}
        </select>
        <select name="facolte" id="facolte">
          <option value="null" hidden>
            استاد
          </option>
          {facolte.map((fc, ndx) => (
            <option value={fc} key={ndx}>
              {fc}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Student;
