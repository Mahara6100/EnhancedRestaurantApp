import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const onSubmit = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      history.replace('/') // ✅ Redirect to Home
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
