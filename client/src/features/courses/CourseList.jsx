import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import useTitle from "../../hooks/useTitle";
import Course from "./Course";

const CourseList = () => {
  useTitle("Courses");
  const [data, setData] = useState([]);

  const loadData = async () => {
    await axios
      .get("http://localhost:8080/api/v1/courses")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const tableContent = data.map((item, index) => {
    return (
      <Course
        key={index}
        id={item.id}
        title={item.title}
        credits={item.credits}
        instructor={item.instructor}
      />
    );
  });

  const content = (
    <table className="table ">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th note__status">
            Course ID
          </th>
          <th scope="col" className="table__th note__created">
            Course Title
          </th>
          <th scope="col" className="table__th note__updated">
            Credits
          </th>
          <th scope="col" className="table__th note__title">
            Instructor
          </th>
          <th scope="col" className="table__th note__edit">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );

  return content;
};

export default CourseList;
