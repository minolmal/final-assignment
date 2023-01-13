import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  useTitle("Dashboard");
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome!</h1>
      {/* TODO: add auth to restrict access based on user status */}
      <p>
        <Link to="/dash/students">View Students</Link>
      </p>
      <p>
        <Link to="/dash/students/new">Add New Student</Link>
      </p>
      <p>
        <Link to="/dash/courses">View Courses</Link>
      </p>
      <p>
        <Link to="/dash/courses/new">Add New Course</Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;
