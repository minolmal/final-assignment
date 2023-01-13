import React, { useEffect, useState } from "react";
import { useAddNewStudentMutation } from "./studentsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewStudentForm = () => {
  // TODO: add validation + placeholders
  const [addNewStudent, { isLoading, isSuccess, isError, error }] = useAddNewStudentMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setAge("");
      setContact("");
      navigate("/dash/students");
    }
  }, [isSuccess, navigate]);

  const canSave = [name, age, contact].every(Boolean) && !isLoading;

  const onSaveStudentClicked = async (e) => {
    e.preventDefault();
    if (canSave) await addNewStudent({ name, age, contact });
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validAgeClass = !age ? "form__input--incomplete" : "";
  const validContactClass = !contact ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveStudentClicked}>
        <div className="form__tile-row">
          <h2>New Student</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
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

export default NewStudentForm;
