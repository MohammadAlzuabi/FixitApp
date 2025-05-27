import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchRoles, fetchSubCategories, fetchCategories } from '../data/fetchData';
import { User, Role, SubCategory, Category } from '../types/interfaces';
import UserCard from './UserCard';
import CategoryFilter from './CategoryFilter';

const UserCardsContainer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersData, rolesData, subCatsData, categoriesData] = await Promise.all([
          fetchUsers(),
          fetchRoles(),
          fetchSubCategories(),
          fetchCategories(),
        ]);

        setUsers(usersData);
        setRoles(rolesData);
        setSubCategories(subCatsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Ett fel inträffade');
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredUsers = selectedSubCategory
    ? users.filter(user => user.subCategoryId === selectedSubCategory)
    : [];

  return (
    <>
      <CategoryFilter
        categories={categories}
        subCategories={subCategories}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onCategoryChange={setSelectedCategory}
        onSubCategoryChange={setSelectedSubCategory}
      />

      {loading && <p>Laddar...</p>}
      {error && <p className="text-red-500">Fel: {error}</p>}

      {!loading && !error && selectedSubCategory && filteredUsers.length > 0 && (
        <div className="user-cards-container">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              role={roles.find(r => r.id === user.roleId)}
              subCategory={subCategories.find(sc => sc.id === user.subCategoryId)}
            />
          ))}
        </div>
      )}

      {!loading && selectedSubCategory && filteredUsers.length === 0 && (
        <p>Inga användare hittades för denna subkategori.</p>
      )}

      {!selectedSubCategory && !loading && (
        <p>Välj en kategori och subkategori för att visa användare.</p>
      )}
    </>
  );
};

export default UserCardsContainer;
