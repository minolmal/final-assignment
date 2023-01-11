import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Student = ({ studentId, name, age, contact }) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/students/${studentId}`);

  return (
    <tr className="table__row">
      <td className="table__cell">{studentId}</td>
      <td className="table__cell">{name}</td>
      <td className="table__cell">{age}</td>
      <td className="table__cell">{contact}</td>
      <td className="table__cell">
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

const memoizedStudent = memo(Student);

export default memoizedStudent;
