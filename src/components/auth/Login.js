import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("sign in successfully", userCredential.user);
    }
    catch (error) {
      console.log("Failed to sign in", error);
      alert(error.message);
    }
  }

  return (
    <div className="auth-container">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>كلمة المرور</label>
          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">تسجيل الدخول</button>
      </form>
      <button className="google-btn">الدخول باستخدام جوجل</button>
    </div>
  )
}

export default Login;