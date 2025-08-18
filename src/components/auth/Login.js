import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from '../../firebase';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import './Auth.css';
// import { FcGoogle } from 'react-icons/fc';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setIsProcessing } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data().profileComplete) {
        navigate('/dashboard');
      } else {
        navigate('/complete-profile');
      }
      toast.success("أهلاً بعودتك!");

    } catch (error) {
      console.error("Full Login Error:", error);
      toast.error("فشلت عملية الدخول. يرجى التحقق من البيانات.");
    } finally {
      setIsProcessing(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   const provider = new GoogleAuthProvider();
  //   setIsProcessing(true);

  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     const userDocRef = doc(db, "users", user.uid);
  //     const userDoc = await getDoc(userDocRef);

  //     if (!userDoc.exists()) {
  //       await setDoc(userDocRef, {
  //         email: user.email,
  //         createdAt: new Date(),
  //         profileComplete: false,
  //         subscription: { status: "inactive", plan: null }
  //       });
  //     }

  //     const updatedUserDoc = await getDoc(userDocRef);

  //     if (updatedUserDoc.exists() && updatedUserDoc.data().profileComplete) {
  //       navigate('/dashboard');
  //     } else {
  //       navigate('/complete-profile');
  //     }

  //   } catch (error) {
  //     console.error("Error with Google login: ", error);
  //     toast.error("حدث خطأ أثناء الدخول باستخدام جوجل.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

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
              <div className="forgot-password-link">
                <Link to="/forgot-password">نسيت كلمة السر؟</Link>
              </div>
            </div>
            <button type="submit" className="auth-button">تسجيل الدخول</button>
          </form>
          {/* 
          <div className="auth-divider"><span>أو</span></div>
          <button onClick={handleGoogleLogin} className="auth-button google-btn">
            <FcGoogle className="google-btn-icon" />
            <span>الدخول باستخدام جوجل</span>
          </button>
          */}

          <div className="auth-switch-link">
            <p>ليس لديك حساب؟ <Link to="/signup">أنشئ حسابًا جديدًا</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;