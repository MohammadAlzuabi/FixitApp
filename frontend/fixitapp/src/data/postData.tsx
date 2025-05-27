// src/data/postData.tsx

export async function postCategory(categoryData: { name: string }) {
  const response = await fetch('https://localhost:44300/api/category', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error('Failed to create category: ' + errorText);
  }

  return await response.json(); // Return the created category
}

// Exempel för SubCategory, om du vill lägga till senare
export async function postSubCategory(subCategoryData: {name : string; categoryId : number}) {
  const response = await fetch('https://localhost:44300/api/subcategory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subCategoryData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error('Failed to create subcategory: ' + errorText);
  }

  return await response.json();
}
export async function postUser(userData: {name : string; roleId : number}) {
  const response = await fetch('https://localhost:44300/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error('Failed to create user: ' + errorText);
  }

  return await response.json();
}

export async function postRole(roleData: {name: string}) {
  const response = await fetch('https://localhost:44300/api/role', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roleData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error('Failed to create role: ' + errorText);
  }

  return await response.json();
}
