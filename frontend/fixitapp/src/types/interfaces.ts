export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  city?: string;
  address?: string;
  state?: string;
  password: string;
  image: string;
  roleId: number;
  role?: Role;
  subCategoryId: number | null | undefined
  subCategory?: SubCategory;
  title?: string;
  description?: string;
}

export interface Role {
  id: number;
  name: string;
  user?: User;
}

export interface Category {
  id: number;
  name: string;
  subCategory?: SubCategory;
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
  category?: Category;

}


