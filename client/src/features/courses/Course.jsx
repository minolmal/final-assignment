import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Course = ({ id, title, credits, instructor }) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/courses/${id}`);
  return (
    <tr className="table__row">
      <td className="table__cell">{id}</td>
      <td className="table__cell">{title}</td>
      <td className="table__cell">{credits}</td>
      <td className="table__cell">{instructor}</td>
      <td className="table__cell">
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

const memoizedStudent = memo(Course);

export default memoizedStudent;
