import React from "react";
import { useContext } from "react";
import AddFrom from "../components/evalution-from/addFrom";
import { FacultyContext } from "../context/facultyContext";
import useFetch from "../hooks/useFetch";

const Form = () => {
  const faculty = useContext(FacultyContext);
  let { data: faculties } = useFetch("faculty");
  // console.log("form-faculty", faculty);
  faculties = faculty
    ? faculties?.filter((fc) => fc.id === faculty.id)
    : faculties;

  return (
    <section className="font-vazirBold p-10 w-full">
      <div className="grid w-full font-vazirBold">
        <AddFrom faculties={faculties} />
      </div>
    </section>
  );
};

export default Form;
