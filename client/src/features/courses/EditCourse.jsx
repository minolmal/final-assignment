import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import EditCourseForm from "./EditCourseForm";

const EditCourse = () => {
  useTitle("Edit Course");
  const { id } = useParams();
  const [data, setData] = useState([]);

  const loadData = async () => {
    await axios
      .get(`${process.env.SERVER_URL}/courses/${id}`)
      .then((response) => setData(response.data[0]))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const content = <EditCourseForm course={data} />;
  return content;
};

export default EditCourse;
