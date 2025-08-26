import React, { useEffect, useState, useRef } from 'react';
import FeedbackModal from './FeedbackModal';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const SURVEY_DELAY_MS = 3*60*1000; // للـ testing: 30 ثانية — غيّره لـ 5*60*1000 = 5 دقائق عند النشر
const REPEAT_DAYS = 10; // بعد كم يوم نعرض للمستخدم مرة تانية

const FeedbackTrigger = () => {
  const { currentUser } = useAuth();
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // لنعرض فقط للمستخدم المسجل
    if (!currentUser) return;

    // تحقق محليًا أولا — لو المستخدم ارسل تقييمًا محليًا مؤخراً
    const localTs = localStorage.getItem('feedback-submitted-at');
    if (localTs) {
      const diff = Date.now() - parseInt(localTs, 10);
      if (diff < REPEAT_DAYS * 24 * 60 * 60 * 1000) {
        return; // لا نعرض
      }
    }

    // ثم تحقق على Firestore إن المستخدم لم يرسل تقييمًا مؤخرًا
    const checkRemote = async () => {
      try {
        const q = query(
          collection(db, 'feedback'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const doc = snap.docs[0].data();
          const ts = doc.createdAt?.toDate?.();
          if (ts) {
            const diff = Date.now() - ts.getTime();
            if (diff < REPEAT_DAYS * 24 * 60 * 60 * 1000) {
              // المستخدم قدّم تقييمًا خلال آخر REPEAT_DAYS
              return;
            }
          }
        }

        // لو وصل هنا: نعرض النافذة بعد مؤقت
        timerRef.current = setTimeout(() => setShow(true), SURVEY_DELAY_MS);
      } catch (err) {
        console.error('Error checking feedback', err);
        // حتى لو فشلنا، نقدر نعرض بعد المؤقت — اختياري:
        timerRef.current = setTimeout(() => setShow(true), SURVEY_DELAY_MS);
      }
    };

    checkRemote();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentUser]);

  if (!currentUser) return null;

  return show ? <FeedbackModal onClose={() => setShow(false)} /> : null;
};

export default FeedbackTrigger;
