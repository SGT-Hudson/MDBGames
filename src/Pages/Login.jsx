import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithGoogle,
  signInWithGoogleRedirect,
  getGoogleRedirectResult,
  registerWithEmail,
  logInWithEmail,
} from '../firebase';
import { ReactComponent as Google } from '../images/google-color-icon.svg';
import { ReactComponent as Logo } from '../images/logo.svg';
import './Login.css';

// Turn raw Firebase auth error codes into something a user can act on.
const friendlyError = (error) => {
  switch (error?.code) {
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/email-already-in-use':
      return 'That email is already registered. Try logging in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for sign-in. Add it under Firebase Authentication → Settings → Authorized domains.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    default:
      return error?.message || 'Something went wrong. Please try again.';
  }
};

// Popup failures that mean we should retry with the full-page redirect flow.
const POPUP_FALLBACK_CODES = [
  'auth/popup-blocked',
  'auth/cancelled-popup-request',
  'auth/operation-not-supported-in-this-environment',
];

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handles the result when returning from the Google redirect sign-in flow.
  useEffect(() => {
    getGoogleRedirectResult()
      .then((userData) => {
        if (userData) navigate('/profile');
      })
      .catch((err) => setError(friendlyError(err)));
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/profile');
    } catch (err) {
      if (POPUP_FALLBACK_CODES.includes(err?.code)) {
        try {
          await signInWithGoogleRedirect();
          return; // page navigates away; result handled on return
        } catch (redirectErr) {
          setError(friendlyError(redirectErr));
        }
      } else {
        setError(friendlyError(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Read the clicked button directly so we don't depend on async state
    // updates to decide between logging in and registering.
    const action = e.nativeEvent.submitter?.name;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    try {
      if (action === 'login') {
        await logInWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
      navigate('/profile');
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Logo className='large-logo padding-top-logo' />
      <section className='login-section'>
        <button
          className='button google-login large-shadow'
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Log in with Google
          <Google className='google-icon' />
        </button>
        <div className='line'></div>
        <form className='login-form' onSubmit={handleSubmit}>
          <input
            className='flex-center gap-bottom small-shadow'
            type='email'
            name='email'
            placeholder='Enter your email'
          />
          <input
            className='flex-center gap-bottom small-shadow'
            type='password'
            name='password'
            placeholder='Enter your password'
          />
          {error ? (
            <p className='login-error' role='alert'>
              {error}
            </p>
          ) : null}
          <div className='login-button-container'>
            <button
              className='button login-button large-shadow'
              type='submit'
              name='login'
              disabled={loading}
            >
              Log in
            </button>

            <button
              className='button login-button large-shadow'
              type='submit'
              name='register'
              disabled={loading}
            >
              Register
            </button>
          </div>
        </form>
        <Link to='/'>
          <button className='spaced-button button large-button large-shadow'>
            BACK TO MENU
          </button>
        </Link>
      </section>
    </>
  );
}

export default Login;
