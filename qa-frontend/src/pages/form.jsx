import React from "react";
import { useState } from "react";
import { useContext } from "react";
import AddFrom from "../components/evalution-from/addFrom";
import EvaluationFromTable from "../components/evalution-from/table";
import Modal from "../components/modal";
import { FacultyContext } from "../context/facultyContext";
import useFetch from "../hooks/useFetch";

const Form = () => {
  const faculty = useContext(FacultyContext);
  const [addNew, setAddNew] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(false);
  const [loading, setLoading] = useState(false);

  let { data: faculties } = useFetch("faculty");
  let { data: forms, refetch } = useFetch("form");

  faculties = faculty
    ? faculties?.filter((fc) => fc.id === faculty.id)
    : faculties;

  forms = faculty
    ? forms?.filter((fr) => fr.department.facultyId === faculty.id)
    : forms;

  console.log("form-evaluaito", forms);

  const deleteF = async (data) => {
    setSelectedFaculty(data);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };
  const updateF = async (data) => {
    console.log("update f", data);
    setSelectedFaculty(data);
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <div className="grid w-full font-vazirBold">
        {!addNew ? (
          <EvaluationFromTable
            setIsOpenModal={setAddNew}
            forms={forms}
            deleteF={deleteF}
            updateF={updateF}
          />
        ) : (
          <AddFrom
            faculties={faculties}
            refetch={refetch}
            setAddNew={setAddNew}
          />
        )}
      </div>
    </section>
  );
};

export default Form;
