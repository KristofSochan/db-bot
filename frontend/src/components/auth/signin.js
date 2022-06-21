import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { error } from '../common/alert';
import './index.scss';

async function signinUser(credentials) {
  return fetch('http://localhost:4000/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Signin({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const token = await signinUser({
        username,
        password
      });
      setToken(token);
    } catch (err) {
      error(err);
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="signin center">
      <form onSubmit={handleSubmit} className="modal column">
        <h1 className="title">Sign In</h1>
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
              <span>Sign In</span>
            }
          </button>
        </div>
        <p className="or">Or <Link to="/signup"><span>sign up</span></Link></p>
      </form>
    </div>
  )
}

Signin.propTypes = {
  setToken: PropTypes.func.isRequired
}
