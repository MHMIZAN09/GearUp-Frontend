'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  meta: {
    page: number;
    totalPages: number;
  };
}

export default function Pagination({ meta }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page') || meta.page || 1);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        Previous
      </Button>

      {Array.from({ length: meta.totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <Button
            key={page}
            variant={page === currentPage ? 'default' : 'outline'}
            onClick={() => changePage(page)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        disabled={currentPage === meta.totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
