import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { error, warning } from '../common/alert';
import './index.scss';
import { baseURL } from '../common/constants.js';

async function signinUser(content) {
  const url = baseURL + '/users/signin';
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  };
  const result = await fetch(url, options);
  if (result.status !== 200) return error(result.status + ' ' + result.statusText);

  const resultJSON = await result.json();
  if (resultJSON.warn) return warning(resultJSON.warn);

  return resultJSON;
 }

export default function Signin({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const token = await signinUser({
        email,
        password
      });
      if (token === false) return;
      setToken(token);
      navigate('/dashboard');
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
          <input type="email" autoComplete="email" onChange={e => setEmail(e.target.value)} required />
          <span className="floatingLabel">Email</span>
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
