import React from "react";
import { useParams } from "react-router-dom";
import { selectCourseById } from "./coursesApiSlice";
import { useSelector } from "react-redux";
import EditCourseForm from "./EditCourseForm";

const EditCourse = () => {
  const { id } = useParams();

  const course = useSelector((state) => selectCourseById(state, id));

  const content = course ? <EditCourseForm course={course} /> : <p>Loading...</p>;

  return content;
};

export default EditCourse;
