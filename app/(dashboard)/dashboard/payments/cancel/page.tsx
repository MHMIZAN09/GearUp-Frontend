import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-lg">
        <CardContent className="space-y-6 p-10 text-center">
          <AlertTriangle className="mx-auto h-20 w-20 text-yellow-500" />

          <h1 className="text-3xl font-bold">Payment Cancelled</h1>

          <p className="text-muted-foreground">You cancelled the payment.</p>

          <p className="font-mono text-sm">Order ID: {orderId}</p>

          <Button asChild>
            <Link href="/dashboard/rentals">Back to Rentals</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
