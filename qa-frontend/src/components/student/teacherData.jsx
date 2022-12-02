import React from "react";

const TeacherData = ({ formData }) => {
  const { teacher } = formData;
  return (
    <section className="px-5 py-5 bg-stone-200 font-vazirBlack text-lg shadow-md mb-5">
      <ul className="w-full flex gap-5">
        <li className="grid gap-5">
          <span>فاکولته</span>
          <span>{formData.department.faculty.fa_name}</span>
        </li>
        <li className="grid gap-5">
          <span>دیپارتمنت</span>
          <span>{formData.department.fa_name}</span>
        </li>
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
