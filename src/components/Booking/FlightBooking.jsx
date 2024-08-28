import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { RxCalendar } from 'react-icons/rx';
import Aos from 'aos';
import 'aos/dist/aos.css';
import FlightradarWidget from '../Search/FlightradarWidget';
import { useTranslation } from '../../context/TranslationContext';

const API_KEY = 'JkSQCFgu5dh4Ol4MpgOIpmRYSv5BPq0M';
const API_SECRET = '8bw8bdHeNjtIbQMM';

const FlightBooking = () => {
  const { translations } = useTranslation();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);  // NEW: Store selected flight
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    passportNumber: '',
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleSearchFlights = async () => {
    // Validation des valeurs d'entrée
    if (origin.length !== 3 || destination.length !== 3) {
      setError('Origin and destination must be 3-letter IATA codes.');
      return;
    }
    if (!departureDate) {
      setError('Please select a departure date.');
      return;
    }
    if (!adults || parseInt(adults) <= 0) {
      setError('Please enter a valid number of adults.');
      return;
    }

    setLoading(true);

    try {
      let token = await getAccessToken();
      const requestData = {
        currencyCode: 'USD',
        originDestinations: [
          {
            id: '1',
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDateTimeRange: {
              date: departureDate,
              time: '10:00:00',
            },
          },
        ],
        travelers: [
          {
            id: '1',
            travelerType: 'ADULT',
          },
        ],
        sources: ['GDS'],
        searchCriteria: {
          maxFlightOffers: 2,
          flightFilters: {
            cabinRestrictions: [
              {
                cabin: 'BUSINESS',
                coverage: 'MOST_SEGMENTS',
                originDestinationIds: ['1'],
              },
            ],
          },
        },
      };

      console.log('Request Data:', requestData);

      let response = await axios.post(
        'https://test.api.amadeus.com/v2/shopping/flight-offers',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response Data:', response.data);

      if (response.data && response.data.data) {
        setFlights(response.data.data);
        setError('');
      } else {
        setError('No flights found');
        setFlights([]);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const amadeusErrors = error.response.data.errors;
        const expiredTokenError = amadeusErrors.find(
          (err) => err.title === 'Access token expired'
        );

        if (expiredTokenError) {
          try {
            token = await getAccessToken();
            let response = await axios.post(
              'https://test.api.amadeus.com/v2/shopping/flight-offers',
              requestData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('Response Data:', response.data);

            if (response.data && response.data.data) {
              setFlights(response.data.data);
              setError('');
            } else {
              setError('No flights found');
              setFlights([]);
            }
          } catch (renewError) {
            console.error('Error renewing access token:', renewError);
            setError('Failed to renew access token');
          }
        } else {
          console.error('Amadeus API error:', error.response.data);
          setError('Failed to search flights');
        }
      } else {
        console.error('Error searching flights:', error);
        setError('Failed to search flights');
      }
    }

    setLoading(false);
  };


  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleBookingSubmission = async () => {
    const token = await getAccessToken();

    const travelers = [
      {
        id: '1',
        dateOfBirth: '1990-01-01',  // Example birth date
        name: {
          firstName: passengerInfo.firstName,
          lastName: passengerInfo.lastName,
        },
        gender: 'MALE',
        documents: [
          {
            documentType: 'PASSPORT',
            number: passengerInfo.passportNumber,
            nationality: 'US',  // Example nationality
            holder: true,
          },
        ],
      },
    ];

    try {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/booking/flight-orders',
        {
          type: 'flight-order',
          flightOffers: [selectedFlight],
          travelers: travelers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Booking Successful:', response.data);
      alert('Flight booked successfully!');
    } catch (error) {
      console.error('Booking Error:', error);
      setError('Failed to book flight');
    }
  };

  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: API_KEY,
          client_secret: API_SECRET,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw new Error('Failed to fetch access token');
    }
  };

  return (
    <div className="search section container">
      {/* Existing search UI */}
      <div data-aos="fade-up" data-aos-duration="2500" className="sectionContainer">
        <div className="btns flex">
          <div className="singleBtn">
            <span>Economy</span>
          </div>
          <div className="singleBtn">
            <span>Business Class</span>
          </div>
          <div className="singleBtn">
            <span>First Class</span>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="2000" className="searchInputs flex">
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>{translations.origin || 'Origin'}</h4>
              <input
                type="text"
                placeholder={translations.orPl || 'Enter origin (e.g., NYC)'}
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              />
            </div>
          </div>
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>{translations.destination || 'Destination'}</h4>
              <input
                type="text"
                placeholder="Enter destination (e.g., LAX)"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
              />
            </div>
          </div>
          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className="icon" />
            </div>
            <div className="texts">
              <h4>{translations.travelers || 'Travelers'}</h4>
              <input
                type="number"
                placeholder={translations.guest || 'Add guests '}
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <RxCalendar className="icon" />
            </div>
            <div className="texts">
              <h4>{translations.departure || 'Departure Date'}</h4>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btnBlock flex" onClick={handleSearchFlights} disabled={loading}>
  {loading ? (translations.searching || 'Searching...') : (translations.search || 'Search Flights')}
</button>

        </div>
      </div>
<br></br>
<br></br>
      {error && <p>{error}</p>}

      {flights.length > 0 && (
  <div className="flights">
    <h3 className="flights-title">{translations.flightResults || 'Flight Results'}</h3>
    <ul className="flights-list">
      {flights.map((flight) => (
        <li key={flight.id} className="flight-item">
          <div className="flight-details">
            <h4 className="flight-id">{translations.flight || 'Flight'} {flight.id}</h4>
            <div className="flight-info">
              <div className="info-group">
                <h5>{translations.carrier || 'Carrier'}:</h5>
                <p>{flight.itineraries[0]?.segments[0]?.carrierCode}</p>
              </div>
              <div className="info-group">
                <h5>{translations.departure || 'Departure'}:</h5>
                <p>{flight.itineraries[0]?.segments[0]?.departure.iataCode} - {flight.itineraries[0]?.segments[0]?.departure.at}</p>
              </div>
              <div className="info-group">
                <h5>{translations.arrival || 'Arrival'}:</h5>
                <p>{flight.itineraries[0]?.segments[flight.itineraries[0]?.segments.length - 1]?.arrival.iataCode} - {flight.itineraries[0]?.segments[flight.itineraries[0]?.segments.length - 1]?.arrival.at}</p>
              </div>
              <div className="info-group">
                <h5>{translations.aircraft || 'Aircraft'}:</h5>
                <p>{flight.itineraries[0]?.segments[0]?.aircraft.code} ({flight.itineraries[0]?.segments[0]?.aircraft.code})</p>
              </div>
              <div className="info-group">
                <h5>{translations.price || 'Price'}:</h5>
                <p>${flight.price?.total}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    
  </div>
  
)}
 

      <br></br>
      <br></br>

      {/* Widget Flightradar 
      <h3 className="flights-title">{translations.flightResults || 'Flight Widget'}</h3>
      <FlightradarWidget />
      <br></br>
      <br></br>
    */}
      {/* Booking Form */}
      {selectedFlight && (
        <div className="booking-form">
          <h3>{translations.booking || 'Booking Information'}</h3>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={passengerInfo.firstName}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={passengerInfo.lastName}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, lastName: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Passport Number:</label>
            <input
              type="text"
              value={passengerInfo.passportNumber}
              onChange={(e) => setPassengerInfo({ ...passengerInfo, passportNumber: e.target.value })}
              required
            />
          </div>
          <button onClick={handleBookingSubmission}>
            {translations.bookFlight || 'Book Flight'}
          </button>
        </div>
      )}

      
    </div>
  );
};

export default FlightBooking;
