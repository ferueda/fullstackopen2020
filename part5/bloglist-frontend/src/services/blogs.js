import axios from 'axios';

const baseURL = 'http://localhost:3000/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const createBlog = async (blogObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseURL, blogObject, config);
  return response.data;
};

const updateBlog = async (blogObject, id) => {
  const response = await axios.put(`${baseURL}/${id}`, blogObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.delete(`${baseURL}/${id}`, config);
  return response.data;
};

export default { getAll, createBlog, updateBlog, deleteBlog, setToken };
