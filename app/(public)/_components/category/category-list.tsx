import Pagination from '../../../../components/shared/Pagination';
import { getAllCategories } from '../../../../service/category/category.service';
import CategoryCard from './category-card';

type Category = {
  id: string;
  name: string;
  description?: string;
  _count?: {
    gearItems: number;
  };
};

export async function CategoryList() {
  const result = await getAllCategories();
  const meta = result.meta;
  const categories: Category[] = result.success ? result.data : [];

  if (!categories.length) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            gearCount={category._count?.gearItems ?? 0}
          />
        ))}
      </div>
      <Pagination meta={meta} />
    </>
  );
}
