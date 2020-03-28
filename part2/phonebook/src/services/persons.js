import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createPerson = async personObject => {
  const response = await axios.post(baseURL, personObject);
  return response.data;
};

const deletePerson = async personId => {
  const response = await axios.delete(`${baseURL}/${personId}`);
  return response;
};

export default { getAll, createPerson, deletePerson };
