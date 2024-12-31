import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HikeDetails = () => {
  const { id } = useParams();
  const [hike, setHike] = useState(null);

  useEffect(() => {
    axios.get(`/api/hikes/${id}`)
      .then(response => setHike(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!hike) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h1>{hike.title}</h1>
      <img src={hike.image || 'default-image.jpg'} alt={hike.title} className="img-fluid" />
      <p>{hike.description}</p>
      <ul>
        <li>Difficulty: {hike.difficulty}</li>
        <li>Distance: {hike.distance} km</li>
        <li>Elevation: {hike.elevation} m</li>
      </ul>
    </div>
  );
};

export default HikeDetails;
