import axios from 'axios';

const baseURL = '/api/login';

const login = async ({ username, password }) => {
  try {
    const response = await axios.post(baseURL, { username, password });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export default { login };
