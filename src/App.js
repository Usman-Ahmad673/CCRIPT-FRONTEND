import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Appointments from './Components/Appointments';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </Router>
  );
};

export default App;
