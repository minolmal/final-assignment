import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilePen, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const DASH_REGEX = /^\/dash(\/)?$/;
const COURSES_REGEX = /^\/dash\/courses(\/)?$/;
const STUDENTS_REGEX = /^\/dash\/students(\/)?$/;

const DashHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onStudentsClicked = () => navigate("/dash/students");
  const onCoursesClicked = () => navigate("/dash/courses");
  const onNewStudentClicked = () => navigate("/dash/students/new");
  const onNewCourseClicked = () => navigate("/dash/courses/new");

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !COURSES_REGEX.test(pathname) &&
    !STUDENTS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }
  let newStudentButton = null;
  if (STUDENTS_REGEX.test(pathname)) {
    newStudentButton = (
      <button className="icon-button" title="New Student" onClick={onNewStudentClicked}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }
  let newCourseButton = null;
  if (COURSES_REGEX.test(pathname)) {
    newCourseButton = (
      <button className="icon-button" title="New Course" onClick={onNewCourseClicked}>
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }
  let studentsButton = null;
  if (!STUDENTS_REGEX.test(pathname) && pathname.includes("/dash")) {
    studentsButton = (
      <button className="icon-button" title="Students" onClick={onStudentsClicked}>
        <FontAwesomeIcon icon={faUser} />
      </button>
    );
  }
  let coursesButton = null;
  if (!COURSES_REGEX.test(pathname) && pathname.includes("/dash")) {
    coursesButton = (
      <button className="icon-button" title="Courses" onClick={onCoursesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  let buttonContent = (
    <>
      {newCourseButton}
      {newStudentButton}
      {studentsButton}
      {coursesButton}
    </>
  );
  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">ABC Institute</h1>
        </Link>
        <nav className="dash-header__nav">{buttonContent}</nav>
      </div>
    </header>
  );
  return content;
};

export default DashHeader;
