import React, { useState } from 'react';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Navbar() {
	const { currentUser, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const handleLogout = async () => {
		try {
			await logout();
			toast.info("تم تسجيل الخروج بنجاح.");
		}
		catch (error) {
			toast.error("حدث خطأ أثناء تسجيل الخروج.");
		}
	};

	return (
		<nav className="navbar-container">
			<div className="navbar-logo">iTalebTech
			</div>
			<ul className={isOpen ? "navbar-links active" : "navbar-links"}>
				<li className="close-icon" onClick={() => setIsOpen(false)}>
  &times;
</li>
				<li onClick={() => setIsOpen(false)}><a href="/">الرئيسية</a></li>
				<li onClick={() => setIsOpen(false)}><a href="/courses">الدورات</a></li>
				{currentUser ? (
					<li onClick={() => setIsOpen(false)}><button onClick={handleLogout}>تسجيل الخروج</button></li>
				) : (
					<li onClick={() => setIsOpen(false)}><a href="/login">تسجيل الدخول</a></li>
				)}
			</ul>
			<div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
				<span />
				<span />
				<span />
			</div>
		</nav>
	)
}

export default Navbar;