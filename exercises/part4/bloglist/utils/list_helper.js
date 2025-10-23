
const totalLikes = (blogs) => blogs.reduce(
  (sum, blog) => sum + blog.likes, 0
)

const favoriteBlog = (blogs) => {
  let bestBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > bestBlog.likes) {
      bestBlog = blog
    }
  })
  return bestBlog
}

const mostBlogs = (blogs) => {
  const blogCounts = { }
  blogs.forEach(blog => {
    count = blogCounts[blog.author] || 0
    blogCounts[blog.author] = count + 1
  })
  
  bestAuthor = { author: "none", blogs: -1} // could possibly be nicer
  for (const author in blogCounts) {
    if (blogCounts[author] > bestAuthor.blogs){
      bestAuthor = { author: author, blogs: blogCounts[author] }
    }
  }

  return bestAuthor
}

module.exports = {
   totalLikes, favoriteBlog, mostBlogs
}