import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithGoogle,
  registerWithEmail,
  logInWithEmail,
} from '../firebase';
import { ReactComponent as Google } from '../images/google-color-icon.svg';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    navigate('/profile');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (login) {
      await logInWithEmail(email, password);
      navigate('/profile');
    } else {
      await registerWithEmail(email, password);
      navigate('/profile');
    }
  };

  return (
    <>
      <Logo className='large-logo padding-top-logo' />
      <section className='login-section'>
        <button
          className='button google-login large-shadow'
          onClick={handleGoogleLogin}
        >
          Log in with Google
          <Google className='google-icon' />
        </button>
        <div className='line'></div>
        <form className='login-form' onSubmit={handleSubmit}>
          {/* <label className='form-text'>Email</label> */}

          <input
            className='flex-center gap-bottom small-shadow'
            type='email'
            name='email'
            placeholder='Enter your email'
          />
          {/* <label className='form-text'>Password</label> */}
          <input
            className='flex-center gap-bottom small-shadow'
            type='password'
            name='password'
            placeholder='Enter your password'
          />
          {/* {errorToggle ? <p></p>} */}
          <div className='login-button-container'>
            <button
              className='button login-button large-shadow'
              type='submit'
              name='login'
              onClick={() => setLogin(true)}
            >
              Log in
            </button>

            <button
              className='button login-button large-shadow'
              type='submit'
              name='register'
              onClick={() => setLogin(false)}
            >
              Register
            </button>
          </div>
        </form>
        <Link to='/profile'>
          <button className='spaced-button button large-button large-shadow'>
            BACK TO MENU
          </button>
        </Link>
      </section>
    </>
  );
}

export default Login;
