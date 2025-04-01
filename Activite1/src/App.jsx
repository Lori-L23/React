import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Clock from './components/Clock';
import PostList from './components/PostList';


function App() {
  return (
    <Router>
      <div className="min-h-screen ml-96 ">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Clock" element={<Clock />} />
          <Route path="/PostList" element={<PostList />} />

    
        </Routes>
      </div>
    </Router>
  );
}

export default App;