import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../data/fetchData';
import { postCategory } from '../data/postData';
import { updateCategory } from '../data/putData';
import { deleteCategory } from '../data/deleteData';
import { Category } from '../types/interfaces';


export default function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>([]); //Lagara data från backend
  const [loading, setLoading] = useState(true); // vissa laddningstatus
  const [error, setError] = useState(null); //Vissa felmeddelanden

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [postMessage, setPostMessage] = useState('');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  //Hämta data från Backend (GET)
  const loadCategories = () => {
    fetchCategories()
      .then(data => {
        const categoriesArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.categories)
            ? data.categories
            : [];
        setCategories(categoriesArray);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  //Create data (POST)
  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newCategory = await postCategory({ name: newCategoryName });
      setCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      setShowModal(false);
      setPostMessage('Category created successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setPostMessage('Error: ' + err.message);
      } else {
        setPostMessage('Unknown error occurred');
      }
    }
  };
  // Öppna edit modal och sätta valda data och dess namn
  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setEditedName(category.name);
    setEditModalOpen(true);
  };

  //uppdatera data (PUT)
  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;

    try {
      // Skicka hela objektet med id och namn
      await updateCategory(selectedCategory.id, {
        id: selectedCategory.id,
        name: editedName,
      });
      setEditModalOpen(false);
      setSelectedCategory(null);
      loadCategories(); // Hämta om listan för att visa uppdaterad data
    } catch (err) {
      if (err instanceof Error) {
        alert('Error updating category: ' + err.message);
      } else {
        alert('Unknown error updating role');
      }
    }
  };

  //Delete data (DELETE)
  const handleDeleteCategory = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      if (err instanceof Error) {
        alert('Error deleting category: ' + err.message);
      } else {
        alert('Unknown error deleting cateogry');
      }
    }

  };
  return (
    <div className="table-wrapper">
      <h2>Categories</h2>

      <button className="open-btn" onClick={() => setShowModal(true)}>+ Add Category</button>
      {postMessage && <p>{postMessage}</p>}

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>New Category</h3>
            <form onSubmit={handleCreateCategory}>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
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
            <h3>Edit Category</h3>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              required
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateCategory}>Update</button>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading categories: {error}</p>
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
            {(Array.isArray(categories) ? categories : []).map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <button onClick={() => openEditModal(category)}>Edit</button>
                  <button onClick={() => handleDeleteCategory(category.id)} style={{ marginLeft: '8px', backgroundColor: 'red', color: 'white' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
