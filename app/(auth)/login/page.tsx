import { LoginForm } from "@/app/(auth)/_components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm
          demoAvailability={{
            admin: Boolean(process.env.DEMO_ADMIN_EMAIL && process.env.DEMO_ADMIN_PASSWORD),
            provider: Boolean(
              process.env.DEMO_PROVIDER_EMAIL && process.env.DEMO_PROVIDER_PASSWORD,
            ),
          }}
        />
      </div>
    </div>
  )
}
