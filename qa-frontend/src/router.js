import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import LandingPage from "./pages";
import Department from "./pages/addDepartment";
import Dashboard from "./pages/dashboard";
import Faculty from "./pages/faculty";
import Login from "./pages/login";
import PrivateRoutes from "./pages/privateRoute";
import Questions from "./pages/questions";
import Form from "./pages/form";
import Users from "./pages/users";
import Student from "./pages/student";
import AddUser from "./components/users/add-user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="student">
          <Route index element={<Student />} />
          <Route path="questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="form" element={<Form />} />
            <Route path="add-users" element={<AddUser />} />
            <Route path="users" element={<Users />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="department" element={<Department />} />
            <Route path="department" element={<Department />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
