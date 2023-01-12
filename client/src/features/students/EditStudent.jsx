import React from "react";
import { useParams } from "react-router-dom";
import { selectStudentById } from "./studentsApiSlice";
import { useSelector } from "react-redux";
import EditStudentForm from "./EditStudentForm";

const EditStudent = () => {
  const { id } = useParams();

  const student = useSelector((state) => selectStudentById(state, id));

  const content = student ? <EditStudentForm student={student} /> : <p>Loading...</p>;

  return content;
};

export default EditStudent;
