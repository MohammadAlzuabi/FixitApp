// components/UserCard.tsx
import React from 'react';
import { User, Role, SubCategory } from '../types/interfaces';
import '../css/UserCard.css';

interface Props {
  user: User;
  role: Role | undefined;
  subCategory: SubCategory | undefined;
}


const UserCard: React.FC<Props> = ({ user, role, subCategory }) => {
  return (
    <div className="user-card">
      <img
        src={user.image || '/default-user.png'}
        alt={`Bild på ${user.name}`}
      />
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Roll:</strong> {role?.name || 'Ingen roll'}</p>
      <p><strong>Subkategori:</strong> {subCategory?.name || 'Ingen subkategori'}</p>
      <p><strong>Title:</strong> {user.title || '-'}</p>
      <p><strong>Description:</strong> {user.description || '-'}</p>
      <p><strong>Phone:</strong> {user.phoneNumber || '-'}</p>
      <p><strong>Address:</strong> {user.address || '-'}, {user.city || '-'}, {user.state || '-'}</p>
    </div>
  );
};

export default UserCard;