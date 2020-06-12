import React, { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './LoginSignup.scss';

interface Props {
  currView: string;
  user?: any;
}

// destructures the currView off of the props to determine which view the component is a part of
const LoginSignup: React.FC<Props> = ({ currView }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  /**
   * this handleChange covers both the username and password
   * it determines which one to update based on the event it receives
   * if the event target has a type of password, then it updates password -- otherwise, it updates username
   */
  const handleChange = (e: any) => {
    if (e.target.type === 'password') {
      setPassword(e.target.value);
    } else {
      setUsername(e.target.value);
    }
  };

  // when the user submits their username and password. the view will conditionally render based off of the endpoint. if the user is successful in signing up or loggin in then the page will return to the home screen.
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!username || !password) {
      return alert('User or password cannot be empty');
    }

    let view;
    if (currView === 'login') {
      view = '/login';
    } else if (currView === 'signup') {
      view = '/signup';
    }
    const body = JSON.stringify({ username, password });
    fetch(view as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
        Accept: 'Application/JSON',
      },
      body,
    })
      .then(() => {
        // if successful redirect to the home page
        history.push('/');
      })
      .catch((error) => {
        console.log('Username or Password does not exist!', error);
      });
  };

  return (
    <div className={currView === 'login' ? 'login' : 'signup'}>
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-logo">
              <img
                src={
                  currView === 'login'
                    ? '../../images/milestones_1.png'
                    : '../../images/milestones_2.png'
                }
                alt="apartments"
              />
            </span>

            <span className="login100-form-title p-b-34 p-t-27">
              {currView === 'login' ? 'Log in' : 'Sign up'}
            </span>

            <div className="wrap-input100 validate-input" data-validate="Enter username">
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
              {/* these icons should be brought in for style appeal, but need to have the css modified so they float when the input is selected */}
              <FontAwesomeIcon className="focus-input100" color="white" icon={faUser} />
            </div>

            <div className="wrap-input100 validate-input" data-validate="Enter password">
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
              {/* these icons should be brought in for style appeal, but need to have the css modified so they float when the input is selected */}
              <FontAwesomeIcon className="focus-input100" color="white" icon={faLock} />
            </div>

            <div className="contact100-form-checkbox">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100" htmlFor="ckb1">
                Remember me
              </label>
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                {currView === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            </div>

            {currView === 'login' ? (
              <div className="text-center p-t-3">
                <a className="txt1" href="/password-reset">
                  Forgot Password?
                </a>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
