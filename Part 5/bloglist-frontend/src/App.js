import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
            <input type="password" name="password" value={password} onChange={({target})=>setUsername(target.value)} />  
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App