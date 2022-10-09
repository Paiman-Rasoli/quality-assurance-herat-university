import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Questions from "./pages/questions";
import Student from "./pages/student";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Student />} />
        <Route path="/student" element={<Student />}>
          <Route path="question" element={<Questions />} />
        </Route>
        <Route path="/dashboard" element={<Student />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Student />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
