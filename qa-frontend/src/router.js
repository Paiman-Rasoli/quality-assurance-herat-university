import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FacultyContext } from "./context/facultyContext";
import LandingPage from "./pages";
import Department from "./pages/department";
import Dashboard from "./pages/dashboard";
import Faculty from "./pages/faculty";
import Login from "./pages/login";
import PrivateRoutes from "./utils/privateRoute";
import ProtectedRoutes from "./utils/protecteRoute";
import Form from "./pages/form";
import Users from "./pages/users";
import Student from "./pages/student";
import Teachers from "./pages/teachers";
import Subject from "./pages/subject";
import Question from "./pages/question";
import Layout from "./components/layout/layout";
import AddUser from "./components/users/add-user";

function App() {
  return (
    <FacultyContext.Provider value={null}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="student">
            <Route index element={<Student />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route element={<ProtectedRoutes />}>
                <Route path="faculty" element={<Faculty />} />
                <Route path="add-users" element={<AddUser />} />
                <Route path="users" element={<Users />} />
              </Route>
              <Route path="form" element={<Form />} />
              <Route path="department" element={<Department />} />
              <Route path="teacher" element={<Teachers />} />
              <Route path="subject" element={<Subject />} />
              <Route path="question" element={<Question />} />
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </FacultyContext.Provider>
  );
}

export default App;
