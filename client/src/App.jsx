import "./App.css";
import useTitle from "./hooks/useTitle";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/Welcome";
import StudentList from "./features/students/StudentList";
import NewStudentForm from "./features/students/NewStudentForm";
import EditStudent from "./features/students/EditStudent";
import CourseList from './features/courses/CourseList';
import EditCourse from './features/courses/EditCourse';
import NewCourseForm from './features/courses/NewCourseForm';

function App() {
  useTitle("ABC Institute");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        {/* <Route path="test" element={<Test />} /> */}

        {/* protected routes */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="courses">
            <Route index element={<CourseList />} />
            <Route path=":id" element={<EditCourse />} />
            <Route path="new" element={<NewCourseForm />} />
          </Route>
          
          <Route path="students">
            <Route index element={<StudentList />} />
            <Route path=":id" element={<EditStudent />} />
            <Route path="new" element={<NewStudentForm />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
