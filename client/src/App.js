import { Routes, Route } from "react-router-dom";
import "./App.css";
import DashLayout from "./components/DashLayout";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Welcome from "./features/Welcome";
import StudentsList from "./features/students/StudentsList";
import EditStudent from "./features/students/EditStudent";
import NewStudentForm from "./features/students/NewStudentForm";
import CoursesList from "./features/courses/CoursesList";
import EditCourse from "./features/courses/EditCourse";
import NewCourse from "./features/courses/NewCourse";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="students">
            <Route index element={<StudentsList />} />
            <Route path=":id" element={<EditStudent />} />
            <Route path="new" element={<NewStudentForm />} />
          </Route>
          <Route path="courses">
            <Route index element={<CoursesList />} />
            <Route path=":id" element={<EditCourse />} />
            <Route path="new" element={<NewCourse />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
