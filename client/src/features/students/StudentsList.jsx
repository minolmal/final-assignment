import React from "react";
import { useGetStudentsQuery } from "./studentsApiSlice";
import Student from "./Student";

const StudentsList = () => {
  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery("studentsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = students;

    const tableContent = ids?.length
      ? ids.map((studentId) => <Student key={studentId} studentId={studentId} />)
      : null;

    content = (
      <table className="table table--students">
        <thead className="table__thead">
          <tr>
            <th className="table__th student__id" scope="col">
              ID
            </th>
            <th className="table__th student__name" scope="col">
              Name
            </th>
            <th className="table__th student__age" scope="col">
              Age
            </th>
            <th className="table__th student__contact" scope="col">
              Contact
            </th>
            <th className="table__th student__edit" scope="col">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default StudentsList;
