import React, {useCallback, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Api} from '../../utils/Api'
import './signup.css'

function Index() {
  const {replace, push} = useHistory()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const _handleSubmit = useCallback(async () => {
    if (fullName.length > 2 && email.length > 2 && password.length > 2) {
      setLoading(true)
      const {statusCode, data} = await Api.postRequest('/api/user/signup', {
        email,
        fullName,
        password,
      })
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false)
        alert(data)
        return
      }
      alert(data)
      replace('/signin')
    }
  }, [email, fullName, password, replace])
  if (loading) return <h1>Loading...</h1>
  return (
    <div className="signupscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              // backgroundColor: 'red',
            }}
          >
            <div style={{cursor: 'pointer'}} input type="button" tabIndex="0" onClick={() => push('/')} onKeyDown={(e) => { if (e.key === 'Enter') push('/') }}>
              <i className="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Signup</p>
          </div>

          <label htmlFor="fname">
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your full name.."
            value={fullName}
            onChange={e => setFullName(e.target.value)}/>
            Full Name</label>

          <label htmlFor="email">
          <input
            type="email"
            id="lname"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={e => setEmail(e.target.value)}/>
            Email</label>
          <label for="password">
          <input
            type="password"
            id="lname"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={e => setPassword(e.target.value)}/>
            Password</label>

          <Link to="/signin" className="link">
            <span>Already have an account ?</span>
          </Link>
          <br />

          <input type="submit" value="Sign up" onClick={_handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default Index
