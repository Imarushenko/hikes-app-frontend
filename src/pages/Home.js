import React from 'react';

const Home = () => {
  return (
    <div
      className="home-banner"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
    </div>
  );
};

export default Home;
