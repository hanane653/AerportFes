import React, { useState } from 'react';
import axios from 'axios';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { RxCalendar } from 'react-icons/rx';

import Aos from 'aos';
import 'aos/dist/aos.css';

const API_KEY = 'ZL95SDtlO3jXHUJJ5QXC0cPMaxJ4ge2m';
const API_SECRET = 'urxSFWvFSRwNpmhi';

const Search = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
              <h4>Origin</h4>
              <input
                type="text"
                placeholder="Enter origin (e.g., NYC)"
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
              <h4>Destination</h4>
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
              <h4>Travelers</h4>
              <input
                type="number"
                placeholder="Add guests"
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
              <h4>Departure Date</h4>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btnBlock flex" onClick={handleSearchFlights} disabled={loading}>
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </div>

      {error && <p>{error}</p>}

      {flights.length > 0 && (
        <div className="flights">
          <h3>Flight Results</h3>
          <ul>
            {flights.map((flight) => (
              <li key={flight.id}>
                <div>
                  <h4>Flight {flight.id}</h4>
                  <p>Carrier: {flight.itineraries[0]?.segments[0]?.carrierCode}</p>
                  <p>Departure: {flight.itineraries[0]?.segments[0]?.departure.iataCode} - {flight.itineraries[0]?.segments[0]?.departure.at}</p>
                  <p>Arrival: {flight.itineraries[0]?.segments[flight.itineraries[0]?.segments.length - 1]?.arrival.iataCode} - {flight.itineraries[0]?.segments[flight.itineraries[0]?.segments.length - 1]?.arrival.at}</p>
                  <p>Aircraft: {flight.itineraries[0]?.segments[0]?.aircraft.code} ({flight.itineraries[0]?.segments[0]?.aircraft.code})</p>
                  <p>Price: ${flight.price?.total}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
