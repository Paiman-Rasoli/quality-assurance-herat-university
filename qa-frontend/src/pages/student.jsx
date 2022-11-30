import React, { useState } from "react";
import CheckId from "../components/student/checkId";
import Questions from "./questions";

const Student = () => {
  const [data, setData] = useState();
  return (
    <main className="font-vazirBold my-10 px-5">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center mb-5 leading-10">
        <span className="block xl:inline">دانشگاه هرات</span>{" "}
        <span className="block text-cyan-600 xl:inline">
          کمیته تضمین کیفیت{" "}
        </span>
      </h1>
      <section>
        {!data ? <CheckId setData={setData} /> : <Questions formData={data} />}
      </section>
    </main>
  );
};

export default Student;
