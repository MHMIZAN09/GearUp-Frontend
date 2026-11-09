import VerifyEmailForm from '../_components/verify-email-form';

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { email = '' } = await searchParams;
  return <VerifyEmailForm email={email} />;
}
