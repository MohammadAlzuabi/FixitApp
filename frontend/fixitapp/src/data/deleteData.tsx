// src/data/deleteData.ts
export async function deleteCategory(id: number) {
  const response = await fetch(`https://localhost:44300/api/category/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete category');
  }

  return true;
}

export async function deleteSubCategory(id: number) {
  const response = await fetch(`https://localhost:44300/api/SubCategory/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete subCategory');
  }

  return true;
}

export async function deleteUser(id: number) {
  const response = await fetch(`https://localhost:44300/api/user/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }

  return true;
}

export async function deleteRole(id: number) {
  const response = await fetch(`https://localhost:44300/api/role/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete role');
  }

  return true;
}