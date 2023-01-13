import React, { useEffect, useState } from "react";
import { useAddNewCourseMutation } from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewCourseForm = () => {
  // TODO: add validation + placeholders
  const [addNewCourse, { isLoading, isSuccess, isError, error }] = useAddNewCourseMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [credits, setCredits] = useState("");
  const [instructor, setInstructor] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setCredits("");
      setInstructor("");
      navigate("/dash/courses");
    }
  }, [isSuccess, navigate]);

  const canSave = [title, credits, instructor].every(Boolean) && !isLoading;

  const onSaveCourseClicked = async (e) => {
    e.preventDefault();
    if (canSave) await addNewCourse({ title, credits, instructor });
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validCreditsClass = !credits ? "form__input--incomplete" : "";
  const validInstructorClass = !instructor ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveCourseClicked}>
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
          className={`form__input ${validTitleClass}`}
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
          className={`form__input ${validCreditsClass}`}
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
          className={`form__input ${validInstructorClass}`}
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
