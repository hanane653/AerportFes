// src/amadeusService.jsx
import axios from 'axios';

const API_KEY = 'ZL95SDtlO3jXHUJJ5QXC0cPMaxJ4ge2m';
const API_SECRET = 'urxSFWvFSRwNpmhi';

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      null,
      {
        
        params: {
          grant_type: 'client_credentials',
          client_id: API_KEY,
          client_secret: API_SECRET,
        },
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



export const searchFlights = async (origin, destination, departureDate, adults) => {
  const token = await getAccessToken();
  const requestData = {
    currencyCode: 'USD',
    originDestinations: [
      {
        id: '1',
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDateTimeRange: {
          date: departureDate,
          time: '10:00:00', // You can adjust the time format as needed
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

  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v2/shopping/flight-offers',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data; // Ensure to return the correct data structure here
  } catch (error) {
    console.error('Error searching flights:', error);
    throw new Error('Failed to search flights');
  }
};
