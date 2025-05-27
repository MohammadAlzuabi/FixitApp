import React, { useState } from 'react';
import Header from './Header';
import Footer from './Fotter';
import UserCardsContainer from './UserCardsContainer';

const Home: React.FC = () => {
  const [user, setUser] = useState<{ Id: number; Name: string } | null>({ Id: 1, Name: 'Mohammad' });

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-wrapper">
      <Header user={user} onLogout={handleLogout} />

      <main className="main-content p-6">
        <h1 className="text-3xl font-bold mb-4">Användarkort</h1>
        <UserCardsContainer />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
