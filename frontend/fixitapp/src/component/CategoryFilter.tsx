// components/CategoryFilter.tsx
import React from 'react';
import { Category, SubCategory } from '../types/interfaces';

interface Props {
  categories: Category[];
  subCategories: SubCategory[];
  selectedCategory: number | null;
  selectedSubCategory: number | null;
  onCategoryChange: (id: number | null) => void;
  onSubCategoryChange: (id: number | null) => void;
}

const CategoryFilter: React.FC<Props> = ({
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
}) => {
  const filteredSubCategories = selectedCategory
    ? subCategories.filter(sc => sc.categoryId === selectedCategory)
    : [];

  return (
    <div className="mb-6 flex gap-4">
      <select
        value={selectedCategory ?? ''}
        onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
        className="p-2 border rounded-lg"
      >
        <option value="">Välj kategori</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      {selectedCategory && (
        <select
          value={selectedSubCategory ?? ''}
          onChange={(e) => onSubCategoryChange(e.target.value ? Number(e.target.value) : null)}
          className="p-2 border rounded-lg"
        >
          <option value="">Välj subkategori</option>
          {filteredSubCategories.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategoryFilter;
