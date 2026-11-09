'use client';

import { ArrowLeft, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordAction } from '../_actions/authActions';

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPasswordAction, {
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
          <KeyRound className="size-7" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">Forgot your password?</CardTitle>
          <CardDescription className="text-sm leading-6">
            No worries. Enter your account email and we&apos;ll send you a secure six-digit reset code.
          </CardDescription>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">1</span>
          <span className="h-px w-10 bg-border" />
          <span className="grid size-6 place-items-center rounded-full bg-muted">2</span>
          <span className="h-px w-10 bg-border" />
          <span className="grid size-6 place-items-center rounded-full bg-muted">3</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-7 pb-8 sm:px-10">
        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" name="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl pl-10" required autoComplete="email" />
            </div>
          </div>
          <Button className="h-11 w-full rounded-xl font-semibold" type="submit" disabled={pending}>
            {pending ? 'Sending secure code...' : 'Send reset code'}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" />
          Your account information is kept private and secure.
        </div>
        <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="size-4" /> Back to login
        </Link>
      </CardContent>
    </Card>
  );
}
