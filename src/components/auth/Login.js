import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from '../../firebase';
import './Auth.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("أهلاً بعودتك!");
      console.log("sign in successfully", userCredential.user);
      navigate('/dashboard');
    }
    catch (error) {
      toast.error("فشلت عملية الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.");
    }
  }



  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          createdAt: new Date(),
          subscription: {
            status: "inactive",
            plan: null
          }
        });
        toast.info("تم إنشاء ملفك الشخصي بنجاح!");
      }
      toast.success("أهلاً بعودتك!");
      navigate('/dashboard');
    }
    catch (error) {
      console.error("Error with Google login: ", error);
      toast.error("حدث خطأ أثناء محاولة الدخول باستخدام جوجل.");
    }
  };

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
          <h2>تسجيل الدخول</h2>
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
            <button type="submit" className="auth-button">تسجيل الدخول</button>
            <button
              type="button"
              className="auth-button google-btn"
              onClick={handleGoogleLogin}
            >الدخول باستخدام جوجل</button>
          </form>
          <div className="auth-switch-link">
            <p>ليس لديك حساب؟ <Link to="/signup">أنشئ حسابًا جديدًا</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;