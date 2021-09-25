import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppuser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password,})
      window.localStorage.setItem('loggedBlogAppuser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      console.log('error logging in')
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setUrl('')
        })
  }
  

  if (user === null) {

    return (
      <div> 
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" name="username" value={username} onChange={({target})=>setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" name="password" value={password} onChange={({target})=>setPassword(target.value)} />  
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>
          {user.name} logged-in
          <button onClick={()=>{window.localStorage.removeItem('loggedBlogAppuser'); setUser(null)}}>logout</button>
        </p>
      </div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type="text" name="title" value={title} onChange={({target})=>setTitle(target.value)}/>
        </div>
        <div>
          author:
          <input type="text" name="author" value={author} onChange={({target})=>setAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input type="text" name="url" value={url} onChange={({target})=>setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App