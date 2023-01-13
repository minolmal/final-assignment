import React from "react";
import { useParams } from "react-router-dom";
import { useGetStudentsQuery } from "./studentsApiSlice";
import EditStudentForm from "./EditStudentForm";
import { PulseLoader } from "react-spinners";

const EditStudent = () => {
  const { id } = useParams();

  const { student } = useGetStudentsQuery("studentsList", {
    selectFromResult: ({ data }) => ({
      student: data?.entities[id],
    }),
  });

  if (!student) return <PulseLoader color={"#fff"} />;

  const content = <EditStudentForm student={student} />;

  return content;
};

export default EditStudent;
