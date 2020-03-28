import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const nonExisting = {
    id: 1000,
    content: "This note doesn't exist in the server",
    date: new Date().toISOString(),
    important: true
  };
  return request.data.concat(nonExisting);
};

const create = async newObject => {
  const request = await axios.post(baseUrl, newObject);
  return request.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
};

export default {
  getAll,
  create,
  update
};
