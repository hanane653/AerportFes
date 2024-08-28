import React from 'react';

const Maps = () => {
  return (
    <div>
      <div className="titlesDiv">
        <h2>Airport Location</h2>
      </div>
      <div className="mapContainer">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.406769443012!2d-4.984136799999997!3d33.93066459999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b6da90a7f4f%3A0x4a9f848151d96b0!2zQcOpcm9wb3J0IGRlIEbDqHMtU2HDr3Nz!5e0!3m2!1sfr!2sma!4v1722340598845!5m2!1sfr!2sma"
          width="1300"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Maps;
