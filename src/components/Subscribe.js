import React from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Subscribe.css';

const Subscribe = () => {
  const { currentUser, refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleSubscription = async () => {
    if (!currentUser) return alert("Please log in.");

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        "subscription.status": "active",
        "subscription.plan": "باقة التميز",
        "subscription.startDate": new Date()
      });

      await refreshUser(); // Crucial step to update the context

      toast.success("تم تفعيل اشتراكك بنجاح! استمتع بالدورات.");
      navigate('/courses'); // Redirect to the content they just unlocked
    } catch (error) {
      console.error("Error updating subscription: ", error);
      toast.error("حدث خطأ أثناء محاولة الاشتراك.");
    }
  };
  
  return (
    <div className="subscribe-page">
      <h1>اختر باقتك</h1>
      <div className="pricing-card">
        <h2>باقة التميز</h2>
        <div className="price">150 <span>جنيهًا / شهريًا</span></div>
        <ul className="features-list">
          <li>وصول كامل لكل الدورات</li>
          <li>جلسات مباشرة أسبوعية</li>
          <li>مراجعة للمشاريع</li>
        </ul>
        <button onClick={handleSubscription} className="subscribe-button">
          اشترك الآن
        </button>
      </div>
    </div>
  )

};

export default Subscribe;