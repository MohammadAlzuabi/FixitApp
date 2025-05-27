// src/fetchData.js

export async function fetchUsers() {
  const response = await fetch('https://localhost:44300/api/user');
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
}

export async function fetchCategories() {
  const response = await fetch('https://localhost:44300/api/category');
  if (!response.ok) throw new Error('Failed to fetch categories');
  return await response.json();
}

export async function fetchSubCategories() {
  const response = await fetch('https://localhost:44300/api/subcategory');
  if (!response.ok) throw new Error('Failed to fetch subcategories');
  return await response.json();
}

export async function fetchRoles() {
  const response = await fetch('https://localhost:44300/api/role');
  if (!response.ok) throw new Error('Failed to fetch roles');
  const data = await response.json();
  // Om API returnerar { roles: [...] }, returnera data.roles
  return data.roles ?? data;
}
