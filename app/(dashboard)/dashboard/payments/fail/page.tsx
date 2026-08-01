import { XCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default async function PaymentFailPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-lg">
        <CardContent className="space-y-6 p-10 text-center">
          <XCircle className="mx-auto h-20 w-20 text-red-600" />

          <h1 className="text-3xl font-bold">Payment Failed</h1>

          <p className="text-muted-foreground">Payment could not be completed.</p>

          <p className="font-mono text-sm">Order ID: {orderId}</p>

          <Button asChild>
            <Link href="/dashboard/rentals">Try Again</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
