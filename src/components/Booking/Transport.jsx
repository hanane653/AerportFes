import React, { useState } from 'react';

const Transport = () => {
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    date: '',
    adults: 1, // Default value for adults
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { departure, destination, date } = formData;

    // Format the date into the required format (dd/mm/yyyy)
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Construct the ONCF URL
    const oncfUrl = `https://www.oncf.ma/fr/Horaires-des-trains?from%5BLIN03.T001.FES%5D=${encodeURIComponent(
      departure
    )}&to%5BLIN03.T001.T.VILLE%5D=${encodeURIComponent(
      destination
    )}&datedep=${encodeURIComponent(formattedDate + ' 00:00')}&dateret=&is-ar=1`;

    // Redirect to the ONCF website
    window.location.href = oncfUrl;
  };

  return (
    <div>
      <h2>Train Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Departure:
          <input
            type="text"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button className="But" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Transport;
