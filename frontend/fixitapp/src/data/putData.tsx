export async function updateCategory(id: number, updatedCategory: { id: number; name: string }) {
  const response = await fetch(`https://localhost:44300/api/category/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCategory),
  });

  if (!response.ok) {
    throw new Error('Failed to update category');
  }
  
  return await response.json();
}

export async function updateSubCategory(id: number, updateSubCategory: { id: number; name: string ; categoryId: number}) {
  const response = await fetch(`https://localhost:44300/api/subCategory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateSubCategory),
  });

  if (!response.ok) {
    throw new Error('Failed to update subCateogory');
  }
  
  return await response.json();
}


export async function updateUser(id: number, updateUser: { id: number; name: string ; roleId: number; subCategoryId: number}) {
  const response = await fetch(`https://localhost:44300/api/user/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateUser),
  });

  if (!response.ok) {
    throw new Error('Failed to update updateUser');
  }
  
  return await response.json();
}
export async function updateRole(id: number, updateRole: { id: number; name: string}) {
  const response = await fetch(`https://localhost:44300/api/role/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateRole),
  });

  if (!response.ok) {
    throw new Error('Failed to update updateRole');
  }
  
  return await response.json();
}

