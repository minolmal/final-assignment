import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useGetCoursesQuery } from "./coursesApiSlice";

const Course = ({ courseId }) => {
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({
      course: data?.entities[courseId],
    }),
  });

  const navigate = useNavigate();

  if (course) {
    const handleEdit = () => navigate(`/dash/courses/${courseId}`);

    return (
      <tr className="table__row course">
        <td className="table__cell course__id">{course.id}</td>
        <td className="table__cell course__title">{course.title}</td>
        <td className="table__cell course__credits">{course.credits}</td>
        <td className="table__cell course__instructor">{course.instructor}</td>
        <td className="table__cell course__edit">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
const memoizedCourse = memo(Course);

export default memoizedCourse;
