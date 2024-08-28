import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';


const ContactUs = () => {
  return (
    <div className="contact-us">
      <a
        href="https://wa.me/212657188896"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </div>
  );
};

export default ContactUs;
