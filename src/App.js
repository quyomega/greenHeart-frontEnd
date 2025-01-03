import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserDetails from "./components/UserDetails";
import Organizations from "./components/Organizations";
import OrganizationDetails from "./components/OrganizationDetails";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:orgId" element={<OrganizationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
