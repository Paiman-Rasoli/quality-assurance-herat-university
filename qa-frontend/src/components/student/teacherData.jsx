import React from "react";

const TeacherData = ({ teacher, formData }) => {
  return (
    <section className="border-b-2 px-5 py-5 bg-slate-100">
      <ul className="flex gap-10">
        <li className="grid gap-5">
          <span>استاد</span>
          <span>{teacher.fa_name}</span>
        </li>
        <li className="grid gap-5">
          <span>مضمون</span>
          <span>{formData.subject.name}</span>
        </li>
        <li className="grid gap-5">
          <span>سمستر</span>
          <div>
            <span>{formData.semester}</span> -{" "}
            <span>{formData.semester_type}</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default TeacherData;
