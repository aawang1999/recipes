import { useState } from "react"
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [_, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5500/auth/login', {
        username,
        password
      })
      setCookies("access_token", response.data.token)
      window.localStorage.setItem("userId", response.data.userId)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Log In'
      onSubmit={onSubmit}
    />
  )
}

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5500/auth/register', {
        username,
        password
      })
      alert('Registration completed. Please log in.')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label='Register'
      onSubmit={onSubmit}
    />
  )
}

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  )
}