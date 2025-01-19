import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDetails from "./components/UserDetails";
import Organizations from "./pages/Organizations";
import OrganizationDetails from "./pages/OrganizationDetails";
import Mission from "./pages/Mission";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:orgId" element={<OrganizationDetails />} />
        <Route path="/mission" element={<Mission />} />
      </Routes>
    </Router>
  );
}

export default App;
