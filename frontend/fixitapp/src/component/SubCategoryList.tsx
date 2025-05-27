import React, { useEffect, useState } from 'react';
import { fetchSubCategories } from '../data/fetchData';
import { postSubCategory } from '../data/postData';
import { updateSubCategory } from '../data/putData';
import { deleteSubCategory } from '../data/deleteData';
import { SubCategory, Category } from '../types/interfaces';

export default function SubCategoriesList() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState<number | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [postMessage, setPostMessage] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedCategoryId, setEditedCategoryId] = useState<number | undefined>(undefined);

  useEffect(() => {
    loadSubCategories();
    loadCategories();
  }, []);

  const loadSubCategories = () => {
    fetchSubCategories()
      .then(data => {
        const arr = Array.isArray(data) ? data : Array.isArray(data?.subCategories) ? data.subCategories : [];
        setSubCategories(arr);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const loadCategories = () => {
    // Här behöver du en fetchCategories-funktion som hämtar kategorier
    fetch('https://localhost:44300/api/category')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message));
  };

  const handleCreateSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryId) {
      setPostMessage('Please select a category.');
      return;
    }
    try {
      const newSubCategory = await postSubCategory({ name: newSubCategoryName, categoryId: newCategoryId });
      setSubCategories(prev => [...prev, newSubCategory]);
      setNewSubCategoryName('');
      setNewCategoryId(undefined);
      setShowModal(false);
      setPostMessage('SubCategory created successfully!');
    } catch (err: any) {
      setPostMessage('Error: ' + err.message);
    }
  };

  const openEditModal = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
    setEditedName(subCategory.name);
    setEditedCategoryId(subCategory.categoryId);
    setEditModalOpen(true);
  };

  const handleUpdateSubCategory = async () => {
    if (!selectedSubCategory || !editedCategoryId) return;

    try {
      await updateSubCategory(selectedSubCategory.id, {
        id: selectedSubCategory.id,
        name: editedName,
        categoryId: editedCategoryId,
      });
      setEditModalOpen(false);
      setSelectedSubCategory(null);
      loadSubCategories();
    } catch (err: any) {
      alert('Error updating subCategory: ' + err.message);
    }
  };

  const handleDeleteSubCategory = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      await deleteSubCategory(id);
      loadSubCategories();
    } catch (err: any) {
      alert('Error deleting subCategory: ' + err.message);
    }
  };

  return (
    <div className="table-wrapper">
      <h2>SubCategories</h2>

      <button className="open-btn" onClick={() => setShowModal(true)}>+ Add SubCategory</button>
      {postMessage && <p>{postMessage}</p>}

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>New SubCategory</h3>
            <form onSubmit={handleCreateSubCategory}>
              <input
                type="text"
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e.target.value)}
                placeholder="SubCategory name"
                required
              />
              <select
                value={newCategoryId ?? ''}
                onChange={(e) => setNewCategoryId(Number(e.target.value))}
                required
              >
                <option value="" disabled>-- Select Category --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
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
            <h3>Edit SubCategory</h3>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              required
            />
            <select
              value={editedCategoryId ?? ''}
              onChange={(e) => setEditedCategoryId(Number(e.target.value))}
              required
            >
              <option value="" disabled>-- Select Category --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={handleUpdateSubCategory}>Update</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading subcategories: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th> 
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(subCategories) ? subCategories : []).map(subCategory => (
              <tr key={subCategory.id}>
                <td>{subCategory.id}</td>
                <td>{subCategory.name}</td>
                <td>{subCategory.category?.name || 'No category'}</td>
                <td>
                  <button onClick={() => openEditModal(subCategory)}>Edit</button>
                  <button
                    onClick={() => handleDeleteSubCategory(subCategory.id)}
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
