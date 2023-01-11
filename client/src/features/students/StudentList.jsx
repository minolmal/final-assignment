import axios from "axios";
import React, { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";
import Student from "./Student";

const StudentList = () => {
  useTitle("Students");
  const [data, setData] = useState([]);

  const loadData = async () => {
    await axios
      .get("http://localhost:8080/api/v1/students")
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const tableContent = data.map((item, index) => {
    return (
      <Student
        key={index}
        studentId={item.id}
        name={item.name}
        age={item.age}
        contact={item.contact}
      />
    );
  });

  const content = (
    <table className="table ">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th note__status">
            Student ID
          </th>
          <th scope="col" className="table__th note__created">
            Student Name
          </th>
          <th scope="col" className="table__th note__updated">
            Age
          </th>
          <th scope="col" className="table__th note__title">
            Contact
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

export default StudentList;
