import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import './CourseDetail.css';
import { FiLock, FiPlayCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSubscribed = currentUser?.subscription?.status === 'active';

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourse({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleLessonClick = () => {
    if (isSubscribed) {
      toast.info("ميزة مشاهدة الفيديوهات قيد التطوير!");
    } else {
      toast.error("هذا المحتوى حصري للمشتركين. تواصل معنا لتفعيل اشتراكك.");
    }
  };

  if (loading) {
    return <h2>جاري تحميل تفاصيل الدورة...</h2>;
  }

  if (!course) {
    return <h2>لم يتم العثور على الدورة.</h2>;
  }

  return (
    <div className="course-detail-page">
      <header className="course-detail-header">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <span className="level-badge">{course.level}</span>
      </header>

      {/* رسالة خاصة لغير المشتركين */}
      {!isSubscribed && (
        <div className="activation-prompt">
          <FiLock />
          <span>يبدو أن اشتراكك غير فعال. تواصل معنا عبر واتساب لتفعيل اشتراكك والوصول لكل الدروس!</span>
        </div>
      )}

      <div className="course-roadmap">
        <h2>خارطة طريق الدورة</h2>
        <ul className="lessons-list">
          {course.lessons?.map((lesson, index) => (
            <li key={index} className="lesson-item">
              <div className="lesson-number">{index + 1}</div>
              <div className="lesson-content">
                <div className="lesson-text">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                </div>
                <button onClick={handleLessonClick} className="lesson-play-btn" disabled={!isSubscribed}>
                  {isSubscribed ? <FiPlayCircle /> : <FiLock />}
                  <span>{isSubscribed ? 'ابدأ الدرس' : 'مغلق'}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetail;