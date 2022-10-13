import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import LandingPage from "./pages";
import AddDepartment from "./pages/addDepartment";
import AddFacolte from "./pages/addFacolte";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Questions from "./pages/questions";
import Student from "./pages/student";

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
          <Route path="addfacolte" element={<AddFacolte />} />
          <Route path="addDepartment" element={<AddDepartment />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
