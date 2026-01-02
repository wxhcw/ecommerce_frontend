import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategoryId,
  onCategoryChange
}: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <button
        className={`filter-btn ${selectedCategoryId === null ? 'active' : ''}`}
        onClick={() => onCategoryChange(null)}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`filter-btn ${selectedCategoryId === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

