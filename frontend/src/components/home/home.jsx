import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
      <div className='home__container'>
        <h1 className="home__heading">Plan Everything<br></br>Forget Nothing</h1>
        <Link to='/todo' className='p-2 home-btn'>Get Started</Link>
      </div>
    </div>
  );
};

export default Home;
