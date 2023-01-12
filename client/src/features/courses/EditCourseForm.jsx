import React, { useEffect, useState } from "react";
import { useUpdateCourseMutation, useDeleteCourseMutation } from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditCourseForm = ({ course }) => {
  const [updateCourse, { isLoading, isError, isSuccess, error }] = useUpdateCourseMutation();
  const [deleteCourse, { isError: isDelError, isSuccess: isDelSuccess, error: delError }] =
    useDeleteCourseMutation();

  const navigate = useNavigate();
  const [title, setTitle] = useState(course.title);
  const [credits, setCredits] = useState(course.credits);
  const [instructor, setInstructor] = useState(course.instructor);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setCredits("");
      setInstructor("");
      navigate("/dash/courses");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUpdateCourseClicked = async () =>
    await updateCourse({ id: course.id, title, credits, instructor });

  const onDeleteCourseClicked = async () => await deleteCourse({ id: course.id });

  const canSave = [title, credits, instructor].every(Boolean) && !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validCreditsClass = !credits ? "form__input--incomplete" : "";
  const validInstructorClass = !instructor ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

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
              onClick={onUpdateCourseClicked}
              disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button className="icon-button" title="Delete" onClick={onDeleteCourseClicked}>
              <FontAwesomeIcon icon={faTrashCan} />
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

export default EditCourseForm;
