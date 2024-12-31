import React, { useState, useEffect } from "react";
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
  const [hikes, setHikes] = useState([]); // State to store all hikes
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch hikes on component mount
  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hikes");
        setHikes(response.data);
      } catch (error) {
        console.error("Error fetching hikes:", error);
      }
    };

    fetchHikes();
  }, []);

  const handleInputChange = (e) => {
    setHike({ ...hike, [e.target.name]: e.target.value });
  };

  const handleAddHike = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/hikes", hike);
      setHikes([...hikes, response.data]); // Update hikes list with new hike
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

  const handleDeleteHike = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hikes/${id}`);
      setHikes(hikes.filter((hike) => hike._id !== id)); // Remove the deleted hike
    } catch (error) {
      console.error("Error deleting hike:", error);
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

      {/* Add Hike Form */}
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

      {/* Hikes Table */}
      <div className="mt-5">
        <h2>All Hikes</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Distance (km)</th>
              <th>Elevation (m)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hikes.map((hike) => (
              <tr key={hike._id}>
                <td>{hike.title}</td>
                <td>{hike.difficulty}</td>
                <td>{hike.distance}</td>
                <td>{hike.elevation}</td>
                <td>
                  <button
                    onClick={() => handleDeleteHike(hike._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
