import React from 'react'
import { useState, useEffect, useParams } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({
  id,
  setId,
  email,
  setEmail,
  password,
  setPassword,
  users,
  setUsers,
}) => {
  // const { id } = useParams()
  // const [users, setUsers] = useState([])
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [id, setId] = useState('')

  const navigate = useNavigate()

  const fetchUser = async () => {
    let theId = id
    try {
      const response = await axios.get(`http://localhost:4500/users/${theId}`)
      console.log(response)

      console.log(response.data)

      if (response.status === 200) {
        setUsers(response.data)
        navigate('/wallet')
      } else {
        throw Error('user not found')
      }
    } catch (err) {
      alert(`Error user not found`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    fetchUser()
  }

  function aprox(num) {
    return num.slice(2)
  }

  return (
    <>
      <div className="loginTitle">
        <h1>Login</h1>
      </div>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <div className="form-group row login_group ">
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="col-sm-4">
              <input
                type="email"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row login_group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="col-sm-4">
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row login_group">
            <label htmlFor="id" className="label">
              Id
            </label>
            <div className="col-sm-4">
              <input
                type="number"
                className="form-control"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </>
  )
}

export default Login
