import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Student from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
