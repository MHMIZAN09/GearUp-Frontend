'use client';

import { ArrowLeft, CheckCircle2, KeyRound, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordAction } from '../_actions/authActions';

export default function ResetPasswordForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (state?.message && !state.success) toast.error(state.message);
  }, [state]);

  return (
    <Card className="w-full max-w-lg rounded-3xl border-border/60 bg-card/95 shadow-2xl shadow-primary/10 backdrop-blur">
      <CardHeader className="space-y-5 p-7 text-center sm:p-10">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
          <LockKeyhole className="size-7" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">Create a new password</CardTitle>
          <CardDescription className="text-sm leading-6">
            Enter the code from your email, then choose a strong password for your GearUp account.
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
      <CardContent className="px-7 pb-8 sm:px-10">
        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" name="email" type="email" defaultValue={email} className="h-11 rounded-xl" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">Six-digit reset code</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="otp" name="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} placeholder="000000" className="h-11 rounded-xl pl-10 text-center tracking-[0.35em]" required />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input id="password" name="password" type="password" minLength={8} className="h-11 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" minLength={8} className="h-11 rounded-xl" required />
            </div>
          </div>
          <Button className="h-11 w-full rounded-xl font-semibold" type="submit" disabled={pending}>
            {pending ? 'Updating password...' : 'Reset password'}
          </Button>
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="size-4" /> Back to login
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
