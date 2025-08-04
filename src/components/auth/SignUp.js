import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("create account succeful", userCredential.user);
    }
    catch (error) {
      console.log("failed to create account", error);
      alert(error.message);
    }
  }

  return (
    <div className="auth-container">
      <h2>إنشاء حساب جديد</h2>
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
            vlaue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">إنشاء الحساب</button>
      </form>
    </div>
  )
}

export default SignUp;