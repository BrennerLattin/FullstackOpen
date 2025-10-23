
const totalLikes = (blogs) => blogs.reduce(
  (sum, blog) => sum + blog.likes, 0
)

const favoriteBlog = (blogs) => {
  let bestBlog = blogs[0]
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > bestBlog.likes) {
      bestBlog = blogs[i];
    }
  }
  return bestBlog
}

module.exports = {
   totalLikes, favoriteBlog
}