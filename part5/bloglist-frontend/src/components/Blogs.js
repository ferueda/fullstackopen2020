import React from 'react';

const Blog = ({ blog }) => <p>{blog.title}</p>;

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
