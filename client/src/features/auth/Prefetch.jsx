import React, { useEffect } from "react";
import { store } from "../../app/store";
import { studentsApiSlice } from "../students/studentsApiSlice";
import { coursesApiSlice } from "../courses/coursesApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const students = store.dispatch(studentsApiSlice.endpoints.getStudents.initiate());
    const courses = store.dispatch(coursesApiSlice.endpoints.getCourses.initiate());

    return () => {
      console.log("unsubscribing");
      students.unsubscribe();
      courses.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
