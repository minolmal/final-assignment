import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditCourseForm = ({ course }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [credits, setCredits] = useState("");
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState("");
  const [delerror, setDelError] = useState("");

  console.log(course);
  console.log(course.id, title, credits, instructor);

  const canSave = [title, credits, instructor].every(Boolean);

  const onUpdateStudentClicked = async (e) => {
    if (canSave) {
      await axios
        .patch(`${process.env.SERVER_URL}/courses/${course.id}`, {
          title: title,
          credits: credits,
          instructor: instructor,
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
          navigate("/dash/courses");
        });
    }
  };

  const onDeleteStudentClicked = async (e) => {
    await axios
      .delete(`${process.env.SERVER_URL}/courses/${course.id}`, {
        id: course.id,
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.error(err);
        setDelError(err);
      })
      .finally(() => navigate("/dash/courses"));
  };

  const errClass = error ? "errmsg" : "offscreen";
  const validNameClass = !title ? "form__input--incomplete" : "";
  const validAgeClass = !credits ? "form__input--incomplete" : "";
  const validContactClass = !instructor ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>
            Edit Course: <span style={{ textTransform: "capitalize" }}>{title}</span>
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

        <label htmlFor="credits" className="form__label">
          Credits:
        </label>
        <input
          className={`form__input ${validAgeClass}`}
          type="text"
          id="credits"
          name="credits"
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

export default EditCourseForm;
