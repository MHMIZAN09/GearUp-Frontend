import ForgotPasswordForm from '../_components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-muted/50 p-6">
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <ForgotPasswordForm />
    </main>
  );
}
