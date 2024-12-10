import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Students from './pages/Students';
import Specialties from './pages/Specialties';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/students" element={<Students />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;