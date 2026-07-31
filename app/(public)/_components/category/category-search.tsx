'use client';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

interface CategorySearchProps {
  placeholder?: string;
}

export default function CategorySearch({
  placeholder = 'Search categories...',
}: CategorySearchProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = (value: string) => {
    // console.log('Search value:', value);
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }
    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('searchTerm', value);
      } else {
        params.delete('searchTerm');
      }
      router.push(`${pathName}?${params.toString()}`);
    }, 500);
  };
  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      {/* Input */}
      <Input
        placeholder={placeholder}
        className="h-11 rounded-xl pl-11 pr-11"
        defaultValue={
          searchParams.get('searchTerm') ? searchParams.get('searchTerm')?.toString() : ''
        }
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
