// src/components/RolesList.jsx
import React, { useEffect, useState } from 'react';
import { fetchRoles } from '../data/fetchData';
import { Role } from '../types/interfaces'
import { postRole } from '../data/postData';
import { updateRole } from '../data/putData';
import { deleteRole } from '../data/deleteData';

export default function RolesList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [newRoleName, setNewRoleName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [postMessage, setPostMessage] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = () => {
    fetchRoles()
      .then(data => {
        const rolesArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.roles)
            ? data.roles
            : [];
        setRoles(rolesArray);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleCreateRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newRole = await postRole({ name: newRoleName });
      setRoles(prev => [...prev, newRole]);
      setNewRoleName('');
      setShowModal(false);
      setPostMessage('Role created successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setPostMessage('Error: ' + err.message);
      } else {
        setPostMessage('Unknown error occurred');
      }
    }
  };

  const openEditModal = (role: Role) => {
    setSelectedRole(role);
    setEditedName(role.name);
    setEditModalOpen(true);
  };

  const handleUpdateRole = async () => {
    if (!selectedRole) return;

    try {
      await updateRole(selectedRole.id, {
        id: selectedRole.id,
        name: editedName,
      });
      setEditModalOpen(false);
      setSelectedRole(null);
      loadRoles();
    } catch (err) {
      if (err instanceof Error) {
        alert('Error updating role: ' + err.message);
      } else {
        alert('Unknown error updating role');
      }
    }
  };

  const handleDeleteRole = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this role?");
    if (!confirmDelete) return;

    try {
      await deleteRole(id);
      loadRoles();
    } catch (err) {
      if (err instanceof Error) {
        alert('Error deleteing role: ' + err.message);
      } else {
        alert('Unknown error deleteing role');
      }
    }
  };

  return (
    <div className="table-wrapper">
      <h2>Roles</h2>

      <button className="open-btn" onClick={() => setShowModal(true)}>+ Add Role</button>
      {postMessage && <p>{postMessage}</p>}

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>New Role</h3>
            <form onSubmit={handleCreateRole}>
              <input
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="Role name"
                required
              />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Role</h3>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              required
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateRole}>Update</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading roles: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(roles) ? roles : []).map(role => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>
                  <button onClick={() => openEditModal(role)}>Edit</button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    style={{ marginLeft: '8px', backgroundColor: 'red', color: 'white' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
