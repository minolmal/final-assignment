import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditStudentForm = ({ student }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [delerror, setDelError] = useState("");
  
  console.log(student);
  console.log(student.id, name, age, contact);

  const canSave = [name, age, contact].every(Boolean);

  const onUpdateStudentClicked = async (e) => {
    if (canSave) {
      await axios
        .patch(`http://localhost:8080/api/v1/students/${student.id}`, {
          name: name,
          age: age,
          contact: contact,
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => {
          // setFormName("");
          // setFormAge("");
          // setFormContact("");
          navigate("/dash/students");
        });
    }
  };

  const onDeleteStudentClicked = async (e) => {
    await axios
      .delete(`http://localhost:8080/api/v1/students/${student.id}`, {
        id: student.id,
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.error(err);
        setDelError(err);
      })
      .finally(() => navigate("/dash/students"));
  };

  const errClass = error ? "errmsg" : "offscreen";
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validAgeClass = !age ? "form__input--incomplete" : "";
  const validContactClass = !contact ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

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
