import axios from 'axios';

export const fetchTranslation = async (key, locale) => {
  try {
    const response = await axios.get('http://localhost:8082/messages', {
      params: { key, lang: locale }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching translation:', error);
    return key; // fallback to key if translation is not available
  }
};

export const changeLocale = async (locale) => {
  try {
    await axios.get('http://localhost:8082/changeLocale', {
      params: { lang: locale }
    });
  } catch (error) {
    console.error('Error changing locale:', error);
  }
};
