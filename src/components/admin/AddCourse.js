import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import './Admin.css';
import { useAuth } from '../../context/AuthContext';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Beginner');
  const { setIsProcessing } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!title || !description || !level) {
      return alert("Please fill out all fields.");
    }

    try {
      await addDoc(collection(db, 'courses'), {
        title: title,
        description: description,
        level: level,
        createdAt: new Date()
      });

      toast.success("تمت إضافة الدورة بنجاح!");
      setTitle('');
      setDescription('');
      setLevel('Beginner');
    }
    catch (error) {
      toast.error("فشلت إضافة الدورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="admin-container">
      <h2>Add New Course</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title of Course</label>
          <input
            id="title"
            type="text"
            placeholder="Enter Title of Course"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description of Course</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Description of Course"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="level">Level of Course</label>
          <select
            id="level"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Add Course</button>
      </form>
    </div>
  )
};

export default AddCourse;