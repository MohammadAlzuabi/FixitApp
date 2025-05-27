import React from 'react';

interface User {
  Id: number;
  Name: string;
}

interface HeaderProps {
  user: User | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
      </div>
    </header>
  );
};

export default Header;
