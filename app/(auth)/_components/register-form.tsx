'use client';

import {
  ArrowRight,
  Dumbbell,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Store,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter();

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'PROVIDER'>('CUSTOMER');

  return (
    <div className={cn('flex flex-col gap-6 w-full max-w-4xl mx-auto', className)} {...props}>
      <Card className="overflow-hidden border-border/50 shadow-xl rounded-2xl p-0 bg-card">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left Column: Interactive Form */}
          <form className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <FieldGroup className="gap-4">
              {/* Brand Header */}
              <div className="flex flex-col items-center text-center gap-1.5 mb-1">
                <Link href="/" className="flex items-center gap-2 group mb-1">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
                    <Dumbbell className="h-5 w-5 -rotate-45" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-foreground">
                    Gear<span className="text-primary">Up</span>
                  </span>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Create an Account
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
                  Join GearUp to rent or provide top-quality sports equipment
                </p>
              </div>

              {/* Hidden Input for Role */}
              <input type="hidden" name="role" value={selectedRole} />

              {/* Role Selector Tabs */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold text-foreground">
                  I want to join as:
                </FieldLabel>
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted/60 rounded-xl border border-border/40">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('CUSTOMER')}
                    className={cn(
                      'flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                      selectedRole === 'CUSTOMER'
                        ? 'bg-background text-foreground shadow-sm border border-border/60'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <User className="h-3.5 w-3.5 text-primary" />
                    Customer
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('PROVIDER')}
                    className={cn(
                      'flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                      selectedRole === 'PROVIDER'
                        ? 'bg-background text-foreground shadow-sm border border-border/60'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Store className="h-3.5 w-3.5 text-amber-500" />
                    Gear Provider
                  </button>
                </div>
              </Field>

              {/* Full Name Input Field */}
              <Field className="space-y-1">
                <FieldLabel htmlFor="name" className="text-xs font-semibold text-foreground">
                  Full Name
                </FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="pl-9 h-10 border-border/60 focus:border-primary focus-visible:ring-primary/20 transition-all text-sm"
                  />
                </div>
              </Field>

              {/* Email Input Field */}
              <Field className="space-y-1">
                <FieldLabel htmlFor="email" className="text-xs font-semibold text-foreground">
                  Email Address
                </FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="pl-9 h-10 border-border/60 focus:border-primary focus-visible:ring-primary/20 transition-all text-sm"
                  />
                </div>
              </Field>

              {/* Password Input Field */}
              <Field className="space-y-1">
                <FieldLabel htmlFor="password" className="text-xs font-semibold text-foreground">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="pl-9 pr-10 h-10 border-border/60 focus:border-primary focus-visible:ring-primary/20 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password visibility</span>
                  </button>
                </div>
              </Field>

              {/* Submit Button */}
              <Field className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-10 font-semibold shadow-md shadow-primary/15 transition-all gap-2 cursor-pointer"
                >
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Field>

              {/* Login Callout */}
              <FieldDescription className="text-center text-xs text-muted-foreground pt-1">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-primary hover:underline underline-offset-4"
                >
                  Sign in instead
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Right Column: Outdoor/Sports Visual Showcase */}
          <div className="relative hidden bg-zinc-900 md:block overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80"
              alt="GearUp Sports Equipment"
              className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-overlay transition-transform duration-700 hover:scale-105"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

            {/* Overlay Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
              <div className="flex items-center gap-2 self-start bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-primary-foreground" />
                Trusted Sports Rental Platform
              </div>

              <div className="space-y-2">
                <blockquote className="text-lg font-medium leading-snug text-zinc-100">
                  {selectedRole === 'PROVIDER'
                    ? '&ldquo;List your premium sports gear and turn unused equipment into extra income smoothly.&rdquo;'
                    : '&ldquo;Access top-tier outdoor sports gear without breaking the bank. Rent anytime, anywhere.&rdquo;'}
                </blockquote>
                <p className="text-xs font-semibold text-zinc-400">— GearUp Community</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Terms & Privacy */}
      <FieldDescription className="px-6 text-center text-xs text-muted-foreground">
        By registering, you agree to GearUp&apos;s{' '}
        <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}

export default RegisterForm;
