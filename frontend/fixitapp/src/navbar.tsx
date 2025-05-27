import React from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

interface User {
  Id: number;
  Name: string;
}

interface NavbarProps {
  user: User | null;
  onLogout?: () => void;  // om du vill lägga till logout-knapp
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="navbar">
      <ul>
        {user ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/subcategories">SubCategories</Link></li>
            <li><Link to="/roles">Roles</Link></li>
            <li><Link to="/users">Users</Link></li>
            {onLogout && (
              <li>
                <button
                  onClick={onLogout}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
                >
                  Logga ut
                </button>
              </li>
            )}
          </>
        ) : (
          <li><Link to="/login">Logga in</Link></li>
        )}
      </ul>
    </nav>
  );
}
