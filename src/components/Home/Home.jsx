import React, { useEffect } from 'react';
import { useTranslation } from '../../context/TranslationContext';
import video from '../../assets/vid.mp4';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const { translations } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className='home flex container'>
      <div className="mainText">
        <h1 data-aos='fade-up' data-aos-duration='2500'>
          {translations.welcome || 'Welcome To AeroFez'}
        </h1>
      </div>

      <div className="homeImages flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop className='video'></video>
        </div>
      </div>
    </div>
  );
};

export default Home;
