import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Forecast from './Pages/Forecast';
import Cities from './Pages/Cities';
import About from './Pages/About';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Apply body class for global style switching
  useEffect(() => {
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div 
        className={`min-h-screen flex flex-col ${!darkMode ? 'light' : ''}`}
        style={{
          background: darkMode 
            ? 'radial-gradient(circle at center, #1f2a48 0%, #0f172a 70%)'
            : 'radial-gradient(circle at center, #e0f2fe 0%, #bfdbfe 70%)',
          transition: 'background 0.3s, color 0.3s',
          color: darkMode ? '#ffffff' : '#1e293b',
        }}
      >
        {/* Background atmosphere (adjusted for dark/light mode) */}
        <div className={`fixed inset-0 pointer-events-none overflow-hidden ${darkMode ? 'opacity-100' : 'opacity-30'}`}>
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-sky-500/5 blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-sky-400/5 blur-3xl" />
        </div>

        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
