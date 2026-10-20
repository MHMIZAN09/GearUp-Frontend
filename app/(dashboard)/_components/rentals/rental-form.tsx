'use client';

import { differenceInCalendarDays } from 'date-fns';
import { CalendarDays, CheckCircle2, Minus, Plus, Send, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createRental } from '../../_actions/rental.actions';
import { useRouter } from 'next/navigation';

interface RentalFormProps {
  gearId: string;
  pricePerDay: number;
  quantityAvailable: number;
  isAuthenticated: boolean;
}

export default function RentalForm({
  gearId,
  pricePerDay,
  quantityAvailable,
  isAuthenticated,
}: RentalFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [quantity, setQuantity] = useState(1);

  const [notes, setNotes] = useState('');

  const minimumDate = useMemo(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    return new Date(today.getTime() - offset * 60 * 1000).toISOString().split('T')[0];
  }, []);

  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;

    const days = differenceInCalendarDays(new Date(endDate), new Date(startDate));

    return days > 0 ? days : 0;
  }, [startDate, endDate]);

  const totalPrice = totalDays * quantity * pricePerDay;
  function handleSubmit(formData: FormData) {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

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
    <Card className="overflow-hidden border-primary/15 shadow-lg shadow-primary/5">
      <div className="border-b bg-gradient-to-br from-primary/10 via-background to-background px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <CalendarDays className="size-4" />
              Check availability
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Plan your rental</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Choose your dates and send a request to the provider.
            </p>
          </div>
          <div className="hidden size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20 sm:flex">
            <ShieldCheck className="size-5" />
          </div>
        </div>
      </div>

      <CardContent className="space-y-6 p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </span>
            <span className="text-sm font-medium">Choose dates</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
              2
            </span>
            <span className="text-sm font-medium">Get approval</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
              3
            </span>
            <span className="text-sm font-medium">Pay securely</span>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="gearId" value={gearId} />

          <div className="rounded-2xl border bg-muted/20 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold">When do you need it?</p>
                <p className="text-xs text-muted-foreground">Select a minimum one-day rental.</p>
              </div>
              <CalendarDays className="size-5 text-primary" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start date</Label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="start-date"
                    type="date"
                    name="startDate"
                    min={minimumDate}
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      if (endDate && e.target.value >= endDate) {
                        setEndDate('');
                      }
                    }}
                    className="h-11 pl-10"
                    required={isAuthenticated}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">Return date</Label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="end-date"
                    type="date"
                    name="endDate"
                    min={startDate || minimumDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-11 pl-10"
                    required={isAuthenticated}
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              Return the gear by the selected return date.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-2xl border p-4">
            <div>
              <Label htmlFor="quantity">How many?</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                {quantityAvailable} available right now
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border bg-muted/30 p-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Minus className="size-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                name="quantity"
                min={1}
                max={quantityAvailable}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.min(quantityAvailable, Math.max(1, Number(e.target.value) || 1)))
                }
                className="h-8 w-12 border-0 bg-transparent p-0 text-center font-semibold shadow-none focus-visible:ring-0"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Increase quantity"
                disabled={quantity >= quantityAvailable}
                onClick={() => setQuantity((value) => Math.min(quantityAvailable, value + 1))}
              >
                <Plus className="size-4" />
              </Button>
            </div>
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

          <div className="space-y-3 rounded-2xl border bg-muted/20 p-5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">৳ {pricePerDay} × {totalDays || 0} day{totalDays === 1 ? '' : 's'}</span>
              <span>৳ {pricePerDay * (totalDays || 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantity</span>
              <span>× {quantity}</span>
            </div>
            <div className="flex items-end justify-between border-t pt-4">
              <div>
                <p className="text-sm font-semibold">Estimated total</p>
                <p className="text-xs text-muted-foreground">Payment after provider approval</p>
              </div>
              <span className="text-3xl font-bold text-primary">৳ {totalPrice}</span>
            </div>
          </div>

          <div className="rounded-xl bg-primary/5 px-4 py-3 text-xs leading-5 text-muted-foreground">
            <div className="flex gap-2">
              <Send className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Send your request now. The provider confirms availability first, then payment
                becomes available in your rentals.
              </span>
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
            disabled={isPending || (isAuthenticated && (!startDate || !endDate || totalDays <= 0))}
          >
            {isPending ? 'Sending request...' : isAuthenticated ? 'Rent Now' : 'Login to Rent'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
