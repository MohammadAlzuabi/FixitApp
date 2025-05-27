import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../data/fetchData';
import { postUser } from '../data/postData';
import { updateUser } from '../data/putData';
import { deleteUser } from '../data/deleteData';
import { fetchRoles } from '../data/fetchData';           // Du behöver skapa denna
import { fetchSubCategories } from '../data/fetchData'; // Du behöver skapa denna
import '../css/TableStyles.css'
import { User, Role, SubCategory } from '../types/interfaces';

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newUser, setNewUser] = useState<Partial<User>>({});
  const [editUser, setEditUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [usersData, rolesData, subCatsData] = await Promise.all([
        fetchUsers(),
        fetchRoles(),
        fetchSubCategories(),
      ]);
      setUsers(Array.isArray(usersData) ? usersData : []);
      setRoles(Array.isArray(rolesData) ? rolesData : []);
      setSubCategories(Array.isArray(subCatsData) ? subCatsData : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resten av din kod med onChange, submit, image upload mm är samma, 
  // men ändra hur select onChange hanteras för editUser nedan

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditUser({ ...editUser, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'roleId' || name === 'subCategoryId') {
      setNewUser(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setNewUser(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editUser) return;
    const { name, value } = e.target;

    if (name === 'roleId') {
      setEditUser({ ...editUser, [name]: Number(value) });
    } else if (name === 'subCategoryId') {
      setEditUser({ ...editUser, [name]: value === '' ? null  : Number(value) });
    } else {
      setEditUser({ ...editUser, [name]: value });
    }
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!newUser.name || !newUser.email) {
        alert('Name och Email krävs');
        return;
      }
      const userToCreate = {
        ...newUser,
        roleId: newUser.roleId ?? 0,
        subCategoryId: newUser.subCategoryId ?? 0,
      } as User;

      const created = await postUser(userToCreate);
      setUsers(prev => [...prev, created]);
      setShowAddModal(false);
      setNewUser({});
    } catch (err: any) {
      alert('Fel vid skapande av användare: ' + err.message);
    }
  };

  const openEditModal = (user: User) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser || !editUser.id || !editUser.name || editUser.roleId === undefined) return;

    try {
      const userToUpdate = {
        id: editUser.id,
        name: editUser.name,
        roleId: editUser.roleId,
        subCategoryId: editUser.subCategoryId ?? 0,
        email: editUser.email,
        password: editUser.password,
        address: editUser.address,
        city: editUser.city,
        state: editUser.state,
        image: editUser.image,
        title: editUser.title,
        description: editUser.description,
        phoneNumber: editUser.phoneNumber,
      };

      await updateUser(editUser.id, userToUpdate);
      setShowEditModal(false);
      setEditUser(null);
      loadInitialData();
    } catch (err: any) {
      alert('Fel vid uppdatering: ' + err.message);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('Vill du verkligen ta bort användaren?')) return;
    try {
      await deleteUser(id);
      loadInitialData();
    } catch (err: any) {
      alert('Fel vid borttagning: ' + err.message);
    }
  };

  if (loading) return <p>Laddar användare...</p>;
  if (error) return <p>Fel vid hämtning: {error}</p>;

  return (
    <div className="table-wrapper">
      <h2>User</h2>
      <button className="open-btn" onClick={() => setShowAddModal(true)}>+ Add User</button>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Ny Användare</h3>
            <form onSubmit={handleAddUserSubmit}>
              {/* ... samma inputs som tidigare ... */}
              <input
                type="text"
                name="name"
                placeholder="Namn"
                value={newUser.name || ''}
                onChange={handleAddUserChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={newUser.email || ''}
                onChange={handleAddUserChange}
                required
              />
              <input
                type="text"
                name="password"
                placeholder="password"
                value={newUser.password || ''}
                onChange={handleAddUserChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="address"
                value={newUser.address || ''}
                onChange={handleAddUserChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="state"
                value={newUser.state || ''}
                onChange={handleAddUserChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="city"
                value={newUser.city || ''}
                onChange={handleAddUserChange}
                required
              />

              {/* Bildupload */}
              <label htmlFor="file-upload" className="file-upload-label">
                Välj bild
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleAddImageChange}
              />
              {newUser.image && (
                <img src={newUser.image} alt="Preview" className="file-preview" />
              )}

              <select
                name="roleId"
                value={newUser.roleId ?? ''}
                onChange={handleAddUserChange}
                required
              >
                <option value="" disabled>-- Välj roll --</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>

              <select
                name="subCategoryId"
                value={newUser.subCategoryId ?? 0}
                onChange={handleAddUserChange}
                required // Behåll eller ta bort beroende på krav
              >
                <option value="">-- Ingen subkategori --</option>
                {subCategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>

              {/* title, description, phoneNumber inputs */}
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newUser.title || ''}
                onChange={handleAddUserChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newUser.description || ''}
                onChange={handleAddUserChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newUser.phoneNumber || ''}
                onChange={handleAddUserChange}
              />

              <button type="submit">Spara</button>
              <button type="button" onClick={() => setShowAddModal(false)}>Avbryt</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit user</h3>
            <form onSubmit={handleEditUserSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Namn"
                value={editUser.name || ''}
                onChange={handleEditUserChange}
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={editUser.email || ''}
                onChange={handleEditUserChange}
                required
              />
              <input
                type="text"
                name="passwrod"
                placeholder="Passwrod"
                value={editUser.password || ''}
                onChange={handleEditUserChange}
                required
              />
              {/* Password, address, city, state */}
              <label htmlFor="file-upload" className="file-upload-label">
                Image
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleEditImageChange}
              />
              {editUser.image && (
                <>
                  <img src={editUser.image} alt="Preview" className="file-preview" />
                  <button
                    type="button"
                    onClick={() => setEditUser({ ...editUser, image: undefined })}
                    style={{ display: 'block', marginTop: '5px' }}
                  >
                    Ta bort bild
                  </button>
                </>
              )}
              <select
                name="roleId"
                value={editUser.roleId ?? ''}
                onChange={handleEditUserChange}
                required
              >
                <option value="" disabled>-- Välj roll --</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>

              <select
                name="subCategoryId"
                value={editUser.subCategoryId ?? ''}
                onChange={handleEditUserChange}
              >
                <option value="" disabled>-- Välj subkategori --</option>
                {subCategories.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editUser.title || ''}
                onChange={handleEditUserChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={editUser.description || ''}
                onChange={handleEditUserChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={editUser.phoneNumber || ''}
                onChange={handleEditUserChange}
              />

              <button type="submit">Spara</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Avbryt</button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Email</th>
            <th>Password</th>
            <th>Roll</th>
            <th>Subkategori</th>
            <th>Bild</th>
            <th>Title</th>
            <th>Description</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{roles.find(r => r.id === user.roleId)?.name || 'Ingen roll'}</td>
              <td>{subCategories.find(s => s.id === user.subCategoryId)?.name || 'Ingen subkategori'}</td>
              <td>
                {user.image && <img src={user.image} alt="User" style={{ width: '50px' }} />}
              </td>
              <td>{user.title}</td>
              <td>{user.description}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button onClick={() => openEditModal(user)}>Redigera</button>
                <button onClick={() => handleDeleteUser(user.id)}>Ta bort</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
