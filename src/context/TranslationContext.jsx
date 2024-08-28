import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        // Fetch all required keys here
        const keys = ['welcome', 'origin', 'destination' , 'departure' , 'travelers', 'search' , 'orPl' , 'searching' , 'guest' , 'supp' , 'service' , 'Exp' , 'booking' , 'expBook'];
        const fetchedTranslations = {};

        for (const key of keys) {
          const response = await axios.get(`http://localhost:8082/messages`, {
            params: { key, lang: language }
          });
          fetchedTranslations[key] = response.data;
        }

        setTranslations(fetchedTranslations);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <TranslationContext.Provider value={{ translations, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
