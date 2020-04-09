import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);

  const show = { display: visible ? 'none' : '' };
  const hide = { display: visible ? '' : 'none' };

  const basicStyle = {
    border: '1px solid black',
    padding: '5px 10px',
    margin: '5px 0',
    maxWidth: '300px',
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleLikeClick = () => {
    const blogObject = {
      likes: blog.likes + 1,
    };

    updateBlog(blogObject, blog.id);
  };

  return (
    <div style={basicStyle}>
      <div style={show}>
        <span>{blog.title} </span>
        <button onClick={toggleVisible}>View</button>
      </div>
      <div style={hide}>
        <div>
          Title: {blog.title}
          <button onClick={toggleVisible}>Hide</button>
        </div>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLikeClick}>like</button>
        </div>
        <div>Author: {blog.author}</div>
      </div>
    </div>
  );
};

const Blogs = ({ blogs, updateBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </div>
  );
};

export default Blogs;
