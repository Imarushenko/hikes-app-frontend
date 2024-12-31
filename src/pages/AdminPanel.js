import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = ({ setIsAdmin }) => {
  const [hike, setHike] = useState({
    title: "",
    description: "",
    difficulty: "",
    distance: "",
    elevation: "",
    image: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setHike({ ...hike, [e.target.name]: e.target.value });
  };

  const handleAddHike = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/hikes", hike);
      setSuccess(true);
      setHike({
        title: "",
        description: "",
        difficulty: "",
        distance: "",
        elevation: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding hike:", error);
    }
  };

  const handleLogout = () => {
    // Clear admin session
    setIsAdmin(false);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
      <p>Welcome to the admin panel. You can add, edit, and delete hikes here.</p>
      <form onSubmit={handleAddHike}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={hike.title}
          onChange={handleInputChange}
          className="form-control mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={hike.description}
          onChange={handleInputChange}
          className="form-control mb-3"
          required
        />
        <input
          type="text"
          name="difficulty"
          placeholder="Difficulty"
          value={hike.difficulty}
          onChange={handleInputChange}
          className="form-control mb-3"
          required
        />
        <input
          type="number"
          name="distance"
          placeholder="Distance (km)"
          value={hike.distance}
          onChange={handleInputChange}
          className="form-control mb-3"
          required
        />
        <input
          type="number"
          name="elevation"
          placeholder="Elevation (m)"
          value={hike.elevation}
          onChange={handleInputChange}
          className="form-control mb-3"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={hike.image}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-success">
          Add Hike
        </button>
      </form>
      {success && <p className="mt-3 text-success">Hike added successfully!</p>}
    </div>
  );
};

export default AdminPanel;
