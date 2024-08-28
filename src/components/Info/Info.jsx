import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCalendar } from 'react-icons/rx';
import { BsShieldCheck, BsFillBookmarkFill } from 'react-icons/bs';

const Info = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate('/booking');
  };

  return (
    <div className="info section">
      <div className="infoContainer container">
        <div className="titleDiv flex">
          <h2>Traveler Information</h2>
          <button className="btn">View All</button>
        </div>
        <div className="cardsDiv grid">
          <div className="singleCard grid" onClick={handleBookNowClick}>
            <div className="iconDiv flex">
              <RxCalendar className="icon" />
            </div>
            <span className="cardTitle">Book Now</span>
            <p>
              "Quickly and easily book your transport, flights, or hotel accommodations with our streamlined booking system. Enjoy a hassle-free experience. Start your journey now!"
            </p>
          </div>

          <div className="singleCard grid">
            <div className="iconDiv flex colorOne">
              <BsShieldCheck className="icon" />
            </div>
            <span className="cardTitle">Airport Services</span>
            <p>
              Our airport offers a variety of services for a comfortable travel experience, including parking and convenient transfers., we provide everything you need.
            </p>
          </div>

          <div className="singleCard grid">
            <div className="iconDiv flex colorTwo">
              <BsFillBookmarkFill className="icon" />
            </div>
            <span className="cardTitle">See More</span>
            <p>
              Explore Fes's top attractions and cultural highlights with our detailed tourist information. Our customer service team is ready to assist with support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
