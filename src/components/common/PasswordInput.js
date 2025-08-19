import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './PasswordInput.css';

const PasswordInput = ({ value, onChange, placeholder = "أدخل كلمة المرور" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-wrapper">
      <input 
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <button 
        type="button" 
        className="password-toggle-btn" 
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
};

export default PasswordInput;