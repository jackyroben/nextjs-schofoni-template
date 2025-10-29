import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Join Schofoni today
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
