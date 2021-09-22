const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./list_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier of a blog is id', async () => {
    const blogs = await api.get('/api/blogs').expect(200).expect('Content-type', /application\/json/)
    expect(blogs.body[0].id).toBeDefined()
})


afterAll(() => {
    mongoose.connection.close()
})