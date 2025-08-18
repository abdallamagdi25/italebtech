import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CompleteProfile.css';
import DOMPurify from 'dompurify';

const CompleteProfile = () => {
  const { currentUser, refreshUser, setIsProcessing } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    gender: 'male',
    birthDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.birthDate) {
      return toast.error("يرجى ملء جميع الحقول المطلوبة.");
    }

    setIsProcessing(true);
    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      // تنظيف المدخلات قبل حفظها في قاعدة البيانات
      const sanitizedData = {
        firstName: DOMPurify.sanitize(formData.firstName),
        lastName: DOMPurify.sanitize(formData.lastName),
        phone: DOMPurify.sanitize(formData.phone),
        birthDate: formData.birthDate,
        gender: formData.gender,
      };

      await updateDoc(userDocRef, {
        ...sanitizedData,
        profileComplete: true
      });

      await refreshUser();
      toast.success("تم تحديث ملفك الشخصي بنجاح!");
      navigate('/dashboard');

    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث بياناتك.");
      console.error("Error completing profile:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="complete-profile-page">
      <div className="profile-form-container">
        <h2>أكمل ملفك الشخصي</h2>
        <p>نحتاج بعض المعلومات الإضافية لنبدأ رحلتك.</p>
        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">الاسم الأول</label>
                <input id="firstName" name="firstName" type="text" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">الاسم الأخير</label>
                <input id="lastName" name="lastName" type="text" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="phone">رقم الهاتف</label>
                <input id="phone" name="phone" type="tel" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="birthDate">تاريخ الميلاد</label>
                <input id="birthDate" name="birthDate" type="date" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>الجنس</label>
                <div className="gender-options">
                    <label>
                        <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                        <span>ذكر</span>
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                        <span>أنثى</span>
                    </label>
                </div>
            </div>
          <button type="submit" className="auth-button">حفظ ومتابعة</button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;