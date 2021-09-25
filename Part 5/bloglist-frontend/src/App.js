import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogRef = React.createRef()

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
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppuser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setMessage("Wrong Credentials")
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const addBlog = async (blogObject) => {
    try{
      blogRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
    } catch (expection){
      console.log("error")
    }
    
  }

  if (user === null) {

    return (
      <div> 
        <h2>Login</h2>
        <Notification message={message}/>
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
      <Notification message={message}/>
      <div>
        <p>
          {user.name} logged-in
          <button onClick={()=>{window.localStorage.removeItem('loggedBlogAppuser'); setUser(null)}}>logout</button>
        </p>
        
        <Togglable buttonLabel="add blog" ref={blogRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
      

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App