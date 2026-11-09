'use client';

import { ArrowLeft, CheckCircle2, MailCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verifyEmailAction } from '../_actions/authActions';

export default function VerifyEmailForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(verifyEmailAction, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (!state?.message) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/50 p-6">
      <Card className="w-full max-w-lg rounded-3xl border-border/60 bg-card/95 shadow-2xl shadow-primary/10 backdrop-blur">
        <CardHeader className="space-y-5 p-7 text-center sm:p-10">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
            <MailCheck className="size-7" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">Verify your email</CardTitle>
            <CardDescription className="text-sm leading-6">
              One last step. Enter the six-digit code we sent to verify your GearUp account.
            </CardDescription>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium">
            <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"><CheckCircle2 className="size-4" /></span>
            <span className="h-px w-10 bg-primary" />
            <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">2</span>
            <span className="h-px w-10 bg-border" />
            <span className="grid size-6 place-items-center rounded-full bg-muted">3</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-7 pb-8 sm:px-10">
          <form action={action} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" defaultValue={email} className="h-11 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Verification code</Label>
              <Input id="otp" name="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} placeholder="000000" className="h-12 rounded-xl text-center text-lg tracking-[0.4em]" required />
            </div>
            <Button className="h-11 w-full rounded-xl font-semibold" type="submit" disabled={pending}>
              {pending ? 'Verifying your email...' : 'Verify email'}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            This code expires shortly for your protection.
          </div>
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="size-4" /> Continue to login
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
