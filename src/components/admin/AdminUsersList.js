import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import './Admin.css';

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef);
        const snapshot = await getDocs(q);
        setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>جاري تحميل المستخدمين...</p>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>إدارة المستخدمين ({users.length})</h2>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>البريد الإلكتروني</th>
            <th>الاسم</th>
            <th>حالة الاشتراك</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>
                <span className={`status-badge ${user.subscription?.status === 'active' ? 'active' : 'inactive'}`}>
                  {user.subscription?.status === 'active' ? 'فعال' : 'غير فعال'}
                </span>
              </td>
              <td className="actions-cell">
                <Link to={`/admin/user/${user.id}`} className="action-btn">
                  إدارة
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersList;