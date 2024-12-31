import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllHikes = () => {
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hikes');
        setHikes(response.data);
      } catch (error) {
        console.error('Error fetching hikes:', error);
      }
    };

    fetchHikes();
  }, []);

  return (
    <div className="container mt-5">
      <h1>All Hikes</h1>
      <div className="row">
        {hikes.map((hike) => (
          <div className="col-md-4" key={hike._id}>
            <div className="card mb-4">
              <img src={hike.image || 'default-image.jpg'} alt={hike.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{hike.title}</h5>
                <p className="card-text">{hike.description}</p>
                <p><strong>Difficulty:</strong> {hike.difficulty}</p>
                <p><strong>Distance:</strong> {hike.distance} km</p>
                <p><strong>Elevation:</strong> {hike.elevation} m</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllHikes;
