import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { toast } from 'react-toastify';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Beginner');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="course-info">
          <label>Title of Course</label>
          <input
            type="text"
            placeholder="Enter Title of Course"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="course-info">
          <label htmlFor="description">description of Course</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description of Course"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
        </div>
        <div className="course-info">
          <label htmlFor="level">level of Course</label>
          <select
            id="level"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  )
};

export default AddCourse;