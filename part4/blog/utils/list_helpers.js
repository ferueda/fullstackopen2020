// const dummy = (blogs) => {
//   return 1;
// };

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)[0];
};

// const mostBlogs = (blogs) => {
//   if (blogs.length === 0) {
//     return undefined;
//   }

//   let blogsPerAuthor = {};
//   blogs.forEach((blog) =>
//     blogsPerAuthor[blog.author]
//       ? (blogsPerAuthor[blog.author] = 1)
//       : blogsPerAuthor[blog.author]++x|
//   );

//   const topAuthor = Object.entries(blogsPerAuthor).sort(
//     (a, b) => b[1] - a[1]
//   )[0];
//   return {
//     author: topAuthor[0],
//     blogs: topAuthor[1],
//   };
// };

module.exports = { totalLikes, favoriteBlog };
