import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="max-w-lg">
        <CardContent className="space-y-6 p-10 text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-green-600" />

          <h1 className="text-3xl font-bold">Payment Successful</h1>

          <p className="text-muted-foreground">Your payment has been completed successfully.</p>

          <p className="font-mono text-sm">Order ID: {orderId}</p>

          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link href="/dashboard/rentals">My Rentals</Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
