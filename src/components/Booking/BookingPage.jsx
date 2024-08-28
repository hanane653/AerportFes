import React, { useState } from 'react';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/Design sans titre.png'; 
import image3 from '../../assets/OIP.jpg'; // Ensure the correct image path is used
import Transport from './Transport';
import FlightBooking from './FlightBooking'; // Import the Transport component
//import './BookingPage.css'; // Uncomment this to link the CSS file

const BookingPage = () => {
  const [showTransportOptions, setShowTransportOptions] = useState(false);
  const [showTrainRoutes, setShowTrainRoutes] = useState(false);
  const [showFlightsOptions, setShowFlightOptions] = useState(false);

  const handleTransportClick = () => {
    setShowTransportOptions(!showTransportOptions); 
    // Toggle transport options on click
  };

  const handleTrainRoutesClick = () => {
    setShowTrainRoutes(true); 
    // Display the Transport component
  };

  const handleFlightsClick = () => {
    setShowFlightOptions(true);
    console.log('FlightBooking component should now be visible');
  };
  

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Plan Your Journey</h1>
        <p>Book your transport, flights, or accommodations effortlessly.</p>
      </div>
        
      {/* First Image */}
      <div className="images-section">
        <div className="homeImages">
          <div className="imageWrapper">
            <img src={image2} className="image" alt="Booking Journey 1" />
          </div>
          <div className="imageWrapper homeImages2">
            <img src={image1} className="image" alt="Booking Journey 2" />
          </div>
          <div className="imageWrapper homeImages2">
            <img src={image3} className="image" alt="Booking Journey 3" />
          </div>
        </div>
      </div>
      
      <div className="booking-options">
        <div className="booking-card" onClick={handleTransportClick}>
          <h2>Transport</h2>
          <p>Find the best deals for car rentals and other transport options.</p>
          <button className="booking-btn">Book Transport</button>
        </div>
        <div className="booking-card" onClick={handleFlightsClick}>
          <h2>Flights</h2>
          <p>Search and book flights at the best prices for your destination.</p>
          <button className="booking-btn">Book Flights</button>
        </div>
        <div className="booking-card">
          <h2>Accommodations</h2>
          <p>Discover hotels and accommodations tailored to your needs.</p>
          <button className="booking-btn">Book Accommodations</button>
        </div>
      </div>

      {/* Transport Options Section (conditionally rendered) */}
      {showTransportOptions && (
        <div className="transport-container">
          <h2 className="transport-title">Available Transport Options</h2>
          <div className="transport-options">
            <div className="transport-card">
              <h3>Car Rental</h3>
              <p>Rent a car for your travels with flexible options.</p>
              <button className="transport-btn">Explore Car Rentals</button>
            </div>
            <div className="transport-card">
              <h3>Taxis</h3>
              <p>Book a taxi for a quick and comfortable ride.</p>
              <button className="transport-btn">Book a Taxi</button>
            </div>
            <div className="transport-card">
              <h3>Buses</h3>
              <p>Find affordable bus routes for your destinations.</p>
              <button className="transport-btn">Find Bus Routes</button>
            </div>
            <div className="transport-card">
              <h3>Indrive</h3>
              <p>Use Indrive for convenient and affordable rides.</p>
              <button className="transport-btn">Get a Ride with Indrive</button>
            </div>
            <div className="transport-card">
              <h3>Trains</h3>
              <p>Find affordable train routes for your destinations.</p>
              <button className="transport-btn" onClick={handleTrainRoutesClick}>Find Train Routes</button>
            </div>
          </div>
        </div>
      )}

      {/* Conditionally render the Transport component when showTrainRoutes is true */}
      {showTrainRoutes && <Transport />}
      {showFlightsOptions && <FlightBooking />}
    </div>
  );
};

export default BookingPage;
