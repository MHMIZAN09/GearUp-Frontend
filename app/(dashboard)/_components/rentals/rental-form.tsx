'use client';

import { differenceInCalendarDays } from 'date-fns';
import { CheckCircle2, Clock, Send } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createRental } from '../../_actions/rental.actions';

interface RentalFormProps {
  gearId: string;
  pricePerDay: number;
  quantityAvailable: number;
}

export default function RentalForm({ gearId, pricePerDay, quantityAvailable }: RentalFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [quantity, setQuantity] = useState(1);

  const [notes, setNotes] = useState('');

  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;

    const days = differenceInCalendarDays(new Date(endDate), new Date(startDate));

    return days > 0 ? days : 0;
  }, [startDate, endDate]);

  const totalPrice = totalDays * quantity * pricePerDay;

  function handleSubmit(formData: FormData) {
    setMessage('');
    setIsSuccess(false);

    startTransition(async () => {
      try {
        const result = await createRental(formData);

        setMessage(
          result.success
            ? 'Rental request sent. Payment will unlock after the provider confirms it.'
            : result.message,
        );
        setIsSuccess(result.success);
      } catch (error) {
        console.log(error);
        setMessage('Something went wrong while creating the rental request.');
      }
    });
  }

  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-xl font-semibold">Request this rental</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Submit your dates first. The provider confirms availability before payment.
          </p>
        </div>

        <div className="grid gap-3 rounded-xl border bg-muted/30 p-4 text-sm">
          <div className="flex items-center gap-2">
            <Send className="size-4 text-primary" />
            <span>Customer sends request</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-amber-600" />
            <span>Provider confirms request</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>Payment button appears in your rentals</span>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="gearId" value={gearId} />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Start Date</Label>

              <Input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <Label>End Date</Label>

              <Input
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Quantity</Label>

            <Input
              type="number"
              name="quantity"
              min={1}
              max={quantityAvailable}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <p className="text-sm text-muted-foreground">Available: {quantityAvailable}</p>
          </div>

          <div>
            <Label>Notes</Label>

            <Textarea
              name="notes"
              placeholder="Any special instructions"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex justify-between">
              <span>Price / Day</span>

              <span>৳ {pricePerDay}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Days</span>

              <span>{totalDays}</span>
            </div>

            <div className="flex justify-between">
              <span>Quantity</span>

              <span>{quantity}</span>
            </div>

            <div className="flex justify-between border-t pt-3 font-bold">
              <span>Total</span>

              <span>৳ {totalPrice}</span>
            </div>
          </div>

          {message ? (
            <div
              className={
                isSuccess
                  ? 'rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700'
                  : 'rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive'
              }
            >
              <p>{message}</p>
              {isSuccess ? (
                <Button asChild variant="link" className="mt-2 h-auto p-0 text-emerald-700">
                  <Link href="/dashboard/rentals">View my rentals</Link>
                </Button>
              ) : null}
            </div>
          ) : null}

          <Button
            className="h-10 w-full rounded-full"
            disabled={isPending || !startDate || !endDate || totalDays <= 0}
          >
            {isPending ? 'Sending request...' : 'Rent Now'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
