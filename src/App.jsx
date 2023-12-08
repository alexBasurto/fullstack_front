//App.jsx

import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyGroups from './pages/MyGroups';
import UserDetails from './pages/UserDetails';
import Register from './pages/Register';
import CreateGroup from './pages/CreateGroup';
import Transactions from './components/Transactions';
import Group from './pages/Group';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-transaction" element={<Transactions />} />
        <Route path="/group/:id" element={<Group />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/my-groups" element={<MyGroups />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;