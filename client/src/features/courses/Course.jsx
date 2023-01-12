import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { selectCourseById } from "./coursesApiSlice";

const Course = ({ courseId }) => {
  const course = useSelector((state) => selectCourseById(state, courseId));

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

export default Course;
