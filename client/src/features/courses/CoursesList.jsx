import React from "react";
import Course from "./Course";
import { useGetCoursesQuery } from "./coursesApiSlice";

const CoursesList = () => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery("coursesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = courses;

    const tableContent = ids?.length
      ? ids.map((courseId) => <Course key={courseId} courseId={courseId} />)
      : null;

    content = (
      <table className="table table--courses">
        <thead className="table__thead">
          <tr>
            <th className="table__th course_status" scope="col">
              ID
            </th>
            <th className="table__th course_status" scope="col">
              Title
            </th>
            <th className="table__th course_status" scope="col">
              F credits
            </th>
            <th className="table__th course_status" scope="col">
              Instructor
            </th>
            <th className="table__th course_status" scope="col">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default CoursesList;
