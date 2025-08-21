import React, { useState, useEffect, useCallback } from 'react'; // 1. استيراد useCallback
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Admin.css';


const AdminUserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. تغليف دالة fetchUser بـ useCallback
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser({ id: docSnap.id, ...docSnap.data() });
      } else {
        toast.error("لم يتم العثور على المستخدم!");
        navigate('/admin/users');
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, navigate]);

  // 3. إضافة fetchUser إلى مصفوفة المعتمدات
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const toggleSubscription = async () => {
    const currentStatus = user.subscription?.status;
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        "subscription.status": newStatus
      });
      toast.success(`تم تغيير حالة الاشتراك إلى ${newStatus === 'active' ? 'فعال' : 'غير فعال'}.`);
      fetchUser(); // Refresh the data
    } catch (error) {
      toast.error("حدث خطأ أثناء تحديث الاشتراك.");
    }
  };

  if (loading) return <p>جاري تحميل بيانات المستخدم...</p>;
  if (!user) return null;

  return (
    <div className="admin-container">
      <h2>إدارة المستخدم: {user.firstName} {user.lastName}</h2>
      <div className="user-details-grid">
        <div className="detail-item"><strong>البريد الإلكتروني:</strong> {user.email}</div>
        <div className="detail-item"><strong>رقم الهاتف:</strong> {user.phone}</div>
        <div className="detail-item"><strong>تاريخ الميلاد:</strong> {user.birthDate}</div>
        <div className="detail-item"><strong>الجنس:</strong> {user.gender === 'male' ? 'ذكر' : 'أنثى'}</div>
        <div className="detail-item"><strong>حالة الاشتراك:</strong> 
          <span className={`status-badge ${user.subscription?.status === 'active' ? 'active' : 'inactive'}`}>
            {user.subscription?.status === 'active' ? 'فعال' : 'غير فعال'}
          </span>
        </div>
      </div>
      <button onClick={toggleSubscription} className="submit-btn">
        {user.subscription?.status === 'active' ? 'إلغاء تفعيل الاشتراك' : 'تفعيل الاشتراك'}
      </button>
    </div>
  );
};

export default AdminUserDetail;