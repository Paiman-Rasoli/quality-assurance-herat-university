import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import LandingPage from "./pages";
import Department from "./pages/addDepartment";
import Dashboard from "./pages/dashboard";
import Facolte from "./pages/Facolte";
import Login from "./pages/login";
import Questions from "./pages/questions";
import Student from "./pages/student";
import Users from "./pages/users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student">
          <Route index element={<Student />} />
          <Route path="questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="users" element={<Users />} />
          <Route path="facolte" element={<Facolte />} />
          <Route path="department" element={<Department />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
