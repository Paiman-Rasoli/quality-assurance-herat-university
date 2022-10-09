import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddFacolte from "./pages/addFacolte";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Questions from "./pages/questions";
import Student from "./pages/student";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student">
          <Route index element={<Student />} />
          <Route path="question" element={<Questions />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="addfacolte" element={<AddFacolte />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
