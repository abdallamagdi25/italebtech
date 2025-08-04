import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Team from './components/Team';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><Features /><Team /></>}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
