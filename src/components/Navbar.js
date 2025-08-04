import React, { useState } from 'react';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
	const { currentUser, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const handleLogout = async () => {
		try {
			await logout();
		}
		catch (error) {
			console.log("Failed to logout", error);
			alert("فشل تسجيل الخروج");
		}
	};

	return (
		<nav className="navbar-container">
			<div className="navbar-logo">iTalebTech
			</div>
			<ul className={isOpen ? "navbar-links active" : "navbar-links"}>
				<li><a href="/">الرئيسية</a></li>
				<li><a href="/courses">الدورات</a></li>
				{
					currentUser ? (
						<li><button onClick={ handleLogout }>تسجيل الخروج</button></li>
					) : (
						<li><a href="/login">تسجيل الدخول</a></li>
					)
				}
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