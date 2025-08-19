import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from '../../context/AuthContext';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import './Auth.css';
// import { FcGoogle } from 'react-icons/fc';
import PasswordInput from '../common/PasswordInput';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsProcessing } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف ورقم واحد على الأقل.");
      return; // أوقف تنفيذ الدالة إذا كانت كلمة المرور ضعيفة
    }

    setIsProcessing(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        profileComplete: false,
        subscription: { status: "inactive", plan: null }
      });

      toast.success("تم إنشاء حسابك بنجاح!");
      navigate('/complete-profile'); // توجيه مباشر وواضح

    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("فشل إنشاء الحساب. قد يكون البريد الإلكتروني مستخدماً بالفعل.");
    }
    finally {
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

  //     navigate('/complete-profile'); // توجيه مباشر وواضح للمستخدم الجديد

  //   } catch (error) {
  //     console.error("Error with Google login: ", error);
  //     toast.error("حدث خطأ أثناء محاولة الدخول باستخدام جوجل.");
  //   }
  //   finally {
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
          <h2>إنشاء حساب جديد</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                id="email"
                type="email"
                placeholder="أدخل البريد الإلكترونى"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // <-- الإصلاح الأول هنا
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <p>كلمة المرور يجب أن تتكون من حروف وأرقام فقط</p>
            </div>
            <button type="submit" className="auth-button">إنشاء الحساب</button>
          </form>

          {/*
          <div className="auth-divider"><span>أو</span></div>

          <button onClick={handleGoogleLogin} className="auth-button google-btn">
            <FcGoogle className="google-btn-icon" />
            <span>إنشاء حساب باستخدام جوجل</span>
          </button>
          */}

          <div className="auth-switch-link">
            <p>لديك حساب بالفعل؟ <Link to="/login">سجل الدخول</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;