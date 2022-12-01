import React from "react";
import AddFrom from "../components/evalution-from/addFrom";
import useFetch from "../hooks/useFetch";

const Form = () => {
  const { data: faculties } = useFetch("faculty");
  const { data: teachers } = useFetch("teacher");

  return (
    <section className="font-vazirBold p-10 w-full">
      <div className="grid w-full font-vazirBold">
        {/* <AddFrom faculties={faculties} teachers={teachers} /> */}
      </div>
    </section>
  );
};

export default Form;
