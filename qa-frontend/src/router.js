import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Questions from "./pages/questions";
import Student from "./pages/student";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Student />} />
        <Route path="/student">
          <Route index element={<Student />} />
          <Route path="question" element={<Questions />} />
        </Route>
        <Route path="/admin" element={<Student />}>
          <Route index element={<Student />} />
          <Route path="super_admin" element={<Student />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
