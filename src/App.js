import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AllHikes from "./pages/AllHikes";
import HikeDetails from "./pages/HikeDetails";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Track admin login state

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">TrailVenture</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/hikes">All Hikes</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home isAdmin={isAdmin} />} />
        <Route path="/hikes" element={<AllHikes />} />
        <Route path="/hikes/:id" element={<HikeDetails />} />
        <Route
          path={process.env.REACT_APP_SECRET_PATH}
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <AdminPanel setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
      </Routes>
    </Router>
  );
};

export default App;
