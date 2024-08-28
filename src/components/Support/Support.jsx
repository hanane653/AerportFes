import { useEffect } from "react"
import supportimg from "../../assets/fez.png"
import Aos from 'aos'
import { useTranslation } from '../../context/TranslationContext';
import 'aos/dist/aos.css'


function Support() {
  const { translations } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <div className="support container section">
      <div className="sectionContainer">

        <div className="titlesDiv">
          <small>{translations.supp || 'TRAVEL SUPPORT'}</small>
          <h2>{translations.service || 'AeroFez Services'}</h2>
          <p>"{translations.Exp || '"Explore our comprehensive airport services, including real-time flight information, easy booking options, and a seamless travel experience from arrival to departure."'}</p>
        </div>

        <div className="infoDiv grid">
          <div className="textDiv grid">

            <div data-aos='fade-down' data-aos-duration='2500' className="singleInfo">
              <span className="number">01</span>
              <h4>Flights Booking</h4>
              <p>"Effortlessly book your flights with our user-friendly platform, offering a wide range of options, secure payment methods, and instant confirmations to ensure a smooth travel planning experience." </p>
            </div>

            <div data-aos='fade-down' data-aos-duration='3500' className="singleInfo">
              <span className="number colorOne">02</span>
              <h4>Real-Time Flight Status</h4>
              <p>Stay updated with live flight arrivals, departures, and gate information to ensure timely travel plans. </p>
            </div>

            <div data-aos='fade-down' data-aos-duration='4500' className="singleInfo">
              <span className="number colorTwo">03</span>
              <h4>Airport Transfers</h4>
              <p>Convenient and reliable transport options to and from the airport, including taxis, shuttles, and private cars. </p>
            </div>

            <div data-aos='fade-down' data-aos-duration='5500' className="singleInfo">
              <span className="number">04</span>
              <h4>Hotel Reservations</h4>
              <p>Book nearby hotels with ease, offering a range of accommodations to suit every traveler's needs and budget. </p>
            </div>

            <div data-aos='fade-down' data-aos-duration='4500' className="singleInfo">
              <span className="number colorOne">05</span>
              <h4>Parking Services</h4>
              <p>Secure and convenient parking options for short-term and long-term stays, with easy access to the terminals.</p>
            </div>

            <div data-aos='fade-down' data-aos-duration='5500' className="singleInfo">
              <span className="number colorTwo">06</span>
              <h4>Customer Support</h4>
              <p>24/7 customer support to address all your travel-related queries and provide assistance whenever needed. </p>
            </div>

          </div>



          <div className="imgDiv">
            <img data-aos='fade-left' data-aos-duration='4500' src={supportimg} alt="" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Support
