import React from 'react';
import { signInWithGoogle } from '../firebase';

function Login() {
  return <button onClick={signInWithGoogle}>log</button>;
}

export default Login;
