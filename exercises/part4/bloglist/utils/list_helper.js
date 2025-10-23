
const totalLikes = (blogs) => blogs.reduce(
  (sum, blog) => sum + blog.likes, 0
)

const favoriteBlog = (blogs) => {
  return maxItem(blogs, blog => blog.likes)
}

const mostBlogs = (blogs) => {
  const blogCounts = countItems(blogs, blog => blog.author, blog => 1)
  const authorCountPairs = Object.entries(blogCounts)
    .map(([ author, blogCount ]) => ({ author, blogs: blogCount }))

  return maxItem(authorCountPairs, pair => pair.blogs)
}

const mostLikes = (blogs) => {
  const likeCounts = countItems(blogs, blog => blog.author, blog => blog.likes)
  const authorLikePairs = Object.entries(likeCounts)
    .map(([ author, likes ]) => ({ author, likes }))

  return maxItem(authorLikePairs, pair => pair.likes)
}

const maxItem = (list, measure) => {
  let max = list[0];
  list.forEach(item => {
    if (measure(item) > measure(max)) {
      max = item
    }
  })
  return max
}

const countItems = (list, key, measure) => {
  const counts = { }
  list.forEach(item => {
    count = counts[key(item)] || 0
    counts[key(item)] = count + measure(item)
  })
  return counts
}

module.exports = {
   totalLikes, favoriteBlog, mostBlogs, mostLikes
}