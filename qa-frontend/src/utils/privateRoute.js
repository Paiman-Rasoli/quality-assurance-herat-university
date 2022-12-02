import { Navigate, Outlet } from "react-router-dom";
import jwtDecoder from "jwt-decode";
import { FacultyContext } from "../context/facultyContext";

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token");
  const {
    user: { faculty },
  } = jwtDecoder(token);

  return token ? (
    <FacultyContext.Provider value={faculty}>
      <Outlet />
    </FacultyContext.Provider>
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoutes;
