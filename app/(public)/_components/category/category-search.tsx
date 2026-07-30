'use client';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export default function CategorySearch() {
  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      {/* Input */}
      <Input placeholder="Search categories..." className="h-11 rounded-xl pl-11 pr-11" />
    </div>
  );
}
