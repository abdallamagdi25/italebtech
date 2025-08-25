import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './FeedbackModal.css';

const FeedbackModal = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitFeedback = async () => {
    if (rating === 0) {
      toast.info('من فضلك اختر تقييم من 1 إلى 5');
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        userId: currentUser?.uid || null,
        rating,
        comment: comment || '',
        createdAt: serverTimestamp(),
      });

      // Save local timestamp so we don't annoy the user immediately next time
      localStorage.setItem('feedback-submitted-at', Date.now().toString());

      toast.success('شكراً على ملاحظاتك 💙');
      onClose();
    } catch (err) {
      console.error('Error saving feedback', err);
      toast.error('حدث خطأ أثناء إرسال التقييم');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <h3>📝 قيم تجربتك في iTalebTech</h3>

        <div className="stars">
          {[1,2,3,4,5].map((i) => (
            <span
              key={i}
              className={`star ${i <= rating ? 'filled' : ''}`}
              onClick={() => setRating(i)}
              role="button"
              aria-label={`rate ${i}`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="اكتب تعليقك هنا (اختياري)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={submitFeedback} disabled={submitting}>
            {submitting ? 'جاري الإرسال...' : 'إرسال'}
          </button>
          <button className="cancel" onClick={onClose}>إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
