const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./list_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier of a blog is id', async () => {
    const blogs = await api.get('/api/blogs').expect(200).expect('Content-type', /application\/json/)
    expect(blogs.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }

    await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

})

test('likes property defaults to zero if missing from request', async () => {
    const newBlog = {
        title: "Circe",
        author: "Madeline Miller",
        url: "url"
    }

    await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === 'Circe')
    expect(addedBlog.likes).toBe(0)
})

test('400 bad request if title and url are missing', async () => {
    const newBlog = {
        author: "Martha Wells"
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
})

test('can delete a post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

})

test('can update a post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const blog = {
        title: "Exit Strategy",
        author: "Martha wells",
        url: "goodreads.com/exist_strategy",
        likes: 200
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog).expect(200).expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlog.title).toBe('Exit Strategy')
})

describe('User tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('thecret', 10)
        const user = new User({username: 'root', passwordHash})
        
        await user.save()
    })

    test('invalid users are note added', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'r',
            name: 'Superman',
            password: 'pa'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password and/or username are too short')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart).toHaveLength(usersAtEnd.length)

    })
})


afterAll(() => {
    mongoose.connection.close()
})
