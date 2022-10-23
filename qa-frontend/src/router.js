import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import LandingPage from "./pages";
import Department from "./pages/addDepartment";
import Dashboard from "./pages/dashboard";
import Facolty from "./pages/facolty";
import Login from "./pages/login";
import PrivateRoutes from "./pages/privateRoute";
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
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="users" element={<Users />} />
            <Route path="facolte" element={<Facolty />} />
            <Route path="department" element={<Department />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
