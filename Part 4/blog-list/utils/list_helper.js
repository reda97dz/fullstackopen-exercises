const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 
    ? {}
    : blogs.reduce((blogMaxLikes,blog) => blog.likes > blogMaxLikes.likes ? blog : blogMaxLikes, blogs[0])
}

module.exports = { dummy, totalLikes, favoriteBlog }