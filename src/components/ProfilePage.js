import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProfilePage.css';
import { FiUser, FiGrid, FiSettings, FiLogOut, FiCreditCard, FiEdit, FiSave, FiShield, FiFileText } from 'react-icons/fi';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const { currentUser, logout, refreshUser, setIsProcessing } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        phone: currentUser.phone || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });
      await refreshUser();
      toast.success("تم حفظ التغييرات بنجاح!");
      setIsEditing(false);
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ البيانات.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.info("تم تسجيل الخروج بنجاح.");
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الخروج.");
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-header-card">
        <img src={`https://ui-avatars.com/api/?name=${currentUser?.firstName || currentUser?.email}&background=0D8ABC&color=fff&size=128`} alt="User Avatar" className="profile-avatar" />
        <div className="profile-header-info">
          <h2>{formData.firstName} {formData.lastName}</h2>
          <p>{currentUser?.email}</p>
        </div>
      </div>

      <div className="profile-grid">
        {/* --- Admin Panel Card (Only shows for Admins) --- */}
        {currentUser?.isAdmin && (
          <div className="profile-card admin-card">
            <div className="profile-card-header">
              <h3><FiShield /> لوحة تحكم الأدمن</h3>
            </div>
            <div className="profile-card-body">
              <div className="profile-menu">
                <Link to="/admin/users" className="profile-menu-item">
                  <FiUser className="profile-menu-icon" />
                  <span>إدارة المستخدمين</span>
                </Link>
                <Link to="/admin/courses" className="profile-menu-item">
                  <FiGrid className="profile-menu-icon" />
                  <span>إدارة الدورات والدروس</span>
                </Link>
                <Link to="/admin/add-article" className="profile-menu-item">
                  <FiFileText className="profile-menu-icon" />
                  <span>إضافة مقال جديد</span>
                </Link>
                <Link to="/admin/articles-list" className="profile-menu-item">
                  <FiFileText className="profile-menu-icon" />
                  <span>إدارة المقالات</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* --- Personal Information Card --- */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h3>المعلومات الشخصية</h3>
            <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
              {isEditing ? 'إلغاء' : <><FiEdit /> تعديل</>}
            </button>
          </div>
          <div className="profile-card-body">
            {isEditing ? (
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label>الاسم الأول</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>الاسم الأخير</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>رقم الهاتف</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <button type="submit" className="save-btn"><FiSave /> حفظ التغييرات</button>
              </form>
            ) : (
              <div className="info-display">
                <p><strong>الاسم الأول:</strong> {formData.firstName || 'لم يحدد'}</p>
                <p><strong>الاسم الأخير:</strong> {formData.lastName || 'لم يحدد'}</p>
                <p><strong>رقم الهاتف:</strong> {formData.phone || 'لم يحدد'}</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Account Actions Card --- */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h3>إجراءات الحساب</h3>
          </div>
          <div className="profile-card-body">
            <div className="profile-menu">
              <Link to="/dashboard" className="profile-menu-item">
                <FiGrid className="profile-menu-icon" />
                <span>لوحة التحكم</span>
              </Link>
              <div className="profile-menu-item">
                <FiCreditCard className="profile-menu-icon" />
                <span>إدارة الاشتراك (قريباً)</span>
              </div>
              <div className="profile-menu-item">
                <FiSettings className="profile-menu-icon" />
                <span>الإعدادات (قريباً)</span>
              </div>
              <button onClick={handleLogout} className="profile-menu-item logout-btn">
                <FiLogOut className="profile-menu-icon" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;