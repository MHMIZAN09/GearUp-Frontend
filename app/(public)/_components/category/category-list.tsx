/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategories } from '../../../../service/category/category.service';
import CategoryCard from './category-card';

interface CategoryListProps {
  result: {
    success: boolean;
    data: [
      {
        id: string;
        name: string;
        description?: string;
        _count?: {
          gearItems: number;
        };
      },
    ];
  };
}

export async function CategoryList() {
  const result = await getAllCategories();
  if (!result.success || !result.data?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {result.data.map((category: CategoryListProps | any) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description}
          gearCount={category._count?.gearItems ?? 0}
        />
      ))}
    </div>
  );
}
