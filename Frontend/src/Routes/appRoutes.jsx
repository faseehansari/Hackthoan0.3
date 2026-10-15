
import { Routes, Route } from "react-router-dom";

import Register from "../Pages/register";
import Login from "../Pages/login";
import Dashboard from "../Pages/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
