import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import './Auth.css';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { setIsProcessing } = useAuth(); // To use the loader

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح!");
    } catch (error) {
      toast.error("حدث خطأ. يرجى التأكد من صحة البريد الإلكتروني.");
      console.error("Error sending password reset email:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-pane-left">
        <h1>iTalebTech</h1>
        <p>استعد كلمة مرورك بسهولة وأمان.</p>
      </div>
      <div className="auth-pane-right">
        <div className="auth-form">
          <h2>نسيت كلمة السر؟</h2>
          <p>لا تقلق، أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطًا لاستعادة حسابك.</p>
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
            <button type="submit" className="auth-button">إرسال رابط الاستعادة</button>
          </form>
          <div className="auth-switch-link">
            <p>تذكرت كلمة السر؟ <Link to="/login">العودة لتسجيل الدخول</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;