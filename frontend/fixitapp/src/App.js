import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Navbar from './navbar';
import LoginForm from './component/LoginForm';
import HomePage from './component/Home';
import CategoriesList from './component/CategoryList';
import SubCategoriesList from './component/SubCategoryList';
import RolesList from './component/RoleList';
import UsersList from './component/UserList';
import './css/Layout.css';

const RequireAuth = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const [user, setUser] = useState(null); // Ta bort <any>

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []); // OK med tom array här

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={logout} />

      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={user ? (<Navigate to="/home" />) : (<LoginForm onLogin={setUser} />)}
          />

          <Route element={<RequireAuth user={user} />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage user={user} />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/subcategories" element={<SubCategoriesList />} />
            <Route path="/roles" element={<RolesList />} />
            <Route path="/users" element={<UsersList />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
