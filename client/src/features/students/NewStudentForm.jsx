import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewStudentForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const canSave = [name, age, contact].every(Boolean);

  const onSaveStudentClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await axios
        .post(`${process.env.SERVER_URL}/students`, {
          name,
          age,
          contact,
        })
        .then((response) => {
          console.log(response);
          setName("");
          setAge("");
          setContact("");
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => navigate("/dash/students"));
    }
  };

  const errClass = error ? "errmsg" : "offscreen";
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
