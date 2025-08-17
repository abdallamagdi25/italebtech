import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // استيراد useNavigate
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext'; // استيراد useAuth
import { toast } from 'react-toastify'; // استيراد toast
import './CourseDetail.css';
import { FiPlayCircle, FiLock } from 'react-icons/fi';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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
      // مستقبلاً: هنا سنفتح مشغل الفيديو
      toast.info("ميزة مشاهدة الفيديوهات قيد التطوير!");
    } else {
      // حاليًا: نوجهه لصفحة الاشتراك
      toast.error("هذا المحتوى حصري للمشتركين. يرجى الاشتراك أولاً.");
      navigate('/subscribe');
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
      <div className="course-roadmap">
        <h2>خارطة طريق الدورة</h2>
        
        <ul className="lessons-list">
          {course.lessons?.map((lesson, index) => (
            <li key={index} className="lesson-item">
              <div className="lesson-number">{index + 1}</div>
              <div className="lesson-content">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </div>
              <button onClick={handleLessonClick} className="lesson-play-btn">
                {isSubscribed ? <FiPlayCircle /> : <FiLock />}
                <span>{isSubscribed ? 'ابدأ الدرس' : 'اشترك للمشاهدة'}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetail;