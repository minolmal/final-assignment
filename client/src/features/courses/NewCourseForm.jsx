import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewCourseForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [credits, setCredits] = useState("");
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState("");

  const canSave = [title, credits, instructor].every(Boolean);

  const onSaveStudentClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await axios
        .post(`${process.env.SERVER_URL}/courses`, {
          title,
          credits,
          instructor,
        })
        .then((response) => {
          console.log(response);
          setTitle("");
          setCredits("");
          setInstructor("");
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        })
        .finally(() => navigate("/dash/courses"));
    }
  };

  const errClass = error ? "errmsg" : "offscreen";
  const validNameClass = !title ? "form__input--incomplete" : "";
  const validAgeClass = !credits ? "form__input--incomplete" : "";
  const validContactClass = !instructor ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form className="form" onSubmit={onSaveStudentClicked}>
        <div className="form__tile-row">
          <h2>New Course</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label htmlFor="title" className="form__label">
          Title:
        </label>
        <input
          className={`form__input ${validNameClass}`}
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="credit" className="form__label">
          Credits:
        </label>
        <input
          className={`form__input ${validAgeClass}`}
          type="text"
          id="credit"
          name="credit"
          autoComplete="off"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
        />

        <label htmlFor="instructor" className="form__label">
          Instructor:
        </label>
        <input
          className={`form__input ${validContactClass}`}
          type="text"
          id="instructor"
          name="instructor"
          autoComplete="off"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
      </form>
    </>
  );

  return content;
};

export default NewCourseForm;
