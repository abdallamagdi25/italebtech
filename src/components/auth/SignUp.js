import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import './Auth.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        subscription: {
          status: "inactive",
          plan: null
        }
      });

      toast.success("تم إنشاء حسابك بنجاح! مرحباً بك في iTalebTech.");
      navigate('/dashboard');
    }
    catch (error) {
      toast.error("حدث خطأ. قد يكون البريد الإلكتروني مستخدماً بالفعل.");
    }
  }

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-pane-left">
        <h1>iTalebTech</h1>
        <p>بناء أساس هندسي صلب عبر مشاريع تطبيقية تربط النظرية بالواقع.</p>
      </div>
      <div className="auth-pane-right">
        <div className="auth-form">
          <h2>إنشاء حساب جديد</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button">إنشاء الحساب</button>
          </form>
          <div className="auth-switch-link">
            <p>لديك حساب بالفعل؟ <Link to="/login">سجل الدخول</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;