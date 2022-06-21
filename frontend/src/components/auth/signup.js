import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { error } from '../common/alert';
import { FaSpinner } from 'react-icons/fa';
import './index.scss';

async function signupUser(credentials) {
  return fetch('http://localhost:4000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Signup() {
  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const result = await signupUser({
        email,
        username,
        password
      });
      console.log(result);
    } catch (err) {
      error(err);
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="signin center">
      <form onSubmit={handleSubmit} className="modal column">
        <h1 className="title">Sign Up</h1>
        <label className="input">
          <input type="email" autoComplete="email" onChange={e => setEmail(e.target.value)} required />
          <span className="floatingLabel">Email</span>
        </label>
        <label className="input">
          <input type="text" autoComplete="username" onChange={e => setUserName(e.target.value)} required />
          <span className="floatingLabel">Username</span>
        </label>
        <label className="input">
          <input type="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} required />
          <span className="floatingLabel">Password</span>
        </label>
        <div className="actions">
          <button type="submit">
            {
              loading ?
              <span>
                <FaSpinner
                  className="spinner"
                  fill="#000"
                  width="30px"
                  height="30px"
                />
              </span>
              :
              <span>Sign Up</span>
            }
          </button>
        </div>
        <p className="or">Or <Link to="/signin"><span>sign in</span></Link></p>
      </form>
    </div>
  )
}
