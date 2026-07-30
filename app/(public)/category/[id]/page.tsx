import { Boxes, Calendar, Store } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getCategoryById } from '@/service/category/category.service';

interface CategoryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryDetailsPage = async ({ params }: CategoryDetailsPageProps) => {
  const { id } = await params;

  const result = await getCategoryById(id);

  const category = result.data;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {/* Hero */}
      <div className="rounded-3xl border bg-card p-8 shadow-sm">
        <Badge className="mb-4">Category</Badge>

        <h1 className="text-4xl font-bold">{category.name}</h1>

        <p className="mt-3 max-w-3xl text-muted-foreground">{category.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <Boxes className="h-8 w-8 text-primary" />

              <div>
                <p className="text-2xl font-bold">{category._count.gearItems}</p>
                <p className="text-sm text-muted-foreground">Total Gear</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <Store className="h-8 w-8 text-primary" />

              <div>
                <p className="text-2xl font-bold">{category.providerCount}</p>
                <p className="text-sm text-muted-foreground">Providers</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <Calendar className="h-8 w-8 text-primary" />

              <div>
                <p className="font-semibold">{new Date(category.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">Created</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <Calendar className="h-8 w-8 text-primary" />

              <div>
                <p className="font-semibold">{new Date(category.updatedAt).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">Updated</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailsPage;
