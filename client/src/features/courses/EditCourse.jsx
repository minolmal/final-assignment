import React from "react";
import { useParams } from "react-router-dom";
import {  useGetCoursesQuery } from "./coursesApiSlice";
import EditCourseForm from "./EditCourseForm";
import { PulseLoader } from "react-spinners";

const EditCourse = () => {
  const { id } = useParams();

  const { course } = useGetCoursesQuery("courseList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[id],
    }),
  });

  if (!course) return <PulseLoader color={"#fff"} />;

  const content = <EditCourseForm course={course} />;

  return content;
};

export default EditCourse;
