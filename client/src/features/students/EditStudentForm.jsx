import React, { useEffect, useState } from "react";
import { useUpdateStudentMutation, useDeleteStudentMutation } from "./studentsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditStudentForm = ({ student }) => {
  const [updateStudent, { isLoading, isError, isSuccess, error }] = useUpdateStudentMutation();
  const [deleteStudent, { isError: isDelError, isSuccess: isDelSuccess, error: delError }] =
    useDeleteStudentMutation();

  const navigate = useNavigate();
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [contact, setContact] = useState(student.contact);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setAge("");
      setContact("");
      navigate("/dash/students");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUpdateStudentClicked = async () =>
    await updateStudent({ id: student.id, name, age, contact });

  const onDeleteStudentClicked = async () => await deleteStudent({ id: student.id });

  const canSave = [name, age, contact].every(Boolean) && !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validAgeClass = !age ? "form__input--incomplete" : "";
  const validContactClass = !contact ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>
            Edit Student: <span style={{ textTransform: "capitalize" }}>{name}</span>
          </h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onUpdateStudentClicked}
              disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button className="icon-button" title="Delete" onClick={onDeleteStudentClicked}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        <label htmlFor="name" className="form__label">
          Name:
        </label>
        <input
          className={`form__input ${validNameClass}`}
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="age" className="form__label">
          Age:
        </label>
        <input
          className={`form__input ${validAgeClass}`}
          type="text"
          id="age"
          name="age"
          autoComplete="off"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label htmlFor="contact" className="form__label">
          Contact:
        </label>
        <input
          className={`form__input ${validContactClass}`}
          type="text"
          id="contact"
          name="contact"
          autoComplete="off"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </form>
    </>
  );
  return content;
};

export default EditStudentForm;
