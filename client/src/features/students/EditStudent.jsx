import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import EditStudentForm from "./EditStudentForm";

const EditStudent = () => {
  useTitle("Edit Student");
  const { id } = useParams();
  const [data, setData] = useState([]);

  const loadData = async () => {
    await axios
      .get(`${process.env.SERVER_URL}/students/${id}`)
      .then((response) => setData(response.data[0]))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  // console.log(data);

  const content = <EditStudentForm student={data} />;
  return content;
};

export default EditStudent;
