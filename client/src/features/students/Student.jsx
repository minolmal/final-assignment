import React from "react";
import { selectStudentById } from "./studentsApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Student = ({ studentId }) => {
  const student = useSelector((state) => selectStudentById(state, studentId));

  const navigate = useNavigate();

  if (student) {
    const handleEdit = () => navigate(`/dash/students/${studentId}`);

    const cellStatus = student.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row student">
        <td className={`table__cell ${cellStatus}`}>{student.id}</td>
        <td className={`table__cell ${cellStatus}`}>{student.name}</td>
        <td className={`table__cell ${cellStatus}`}>{student.age}</td>
        <td className={`table__cell ${cellStatus}`}>{student.contact}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default Student;
