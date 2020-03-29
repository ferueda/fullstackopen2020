import axios from 'axios';

const countriesURL = 'https://restcountries.eu/rest/v2/all';
const weatherURL = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}`;

const getCountries = async () => {
  const response = await axios.get(countriesURL);
  return response.data;
};

const getWeather = async capital => {
  const response = await axios.get(`${weatherURL}&query=${capital}`);
  return response.data;
};

export default { getCountries, getWeather };
