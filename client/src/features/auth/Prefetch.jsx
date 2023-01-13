import React, { useEffect } from "react";
import { store } from "../../app/store";
import { studentsApiSlice } from "../students/studentsApiSlice";
import { coursesApiSlice } from "../courses/coursesApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(studentsApiSlice.util.prefetch("getStudents", "studentsList", { force: true }));
    store.dispatch(coursesApiSlice.util.prefetch("getCourses", "coursesList", { force: true }));
  }, []);

  return <Outlet />;
};

export default Prefetch;
