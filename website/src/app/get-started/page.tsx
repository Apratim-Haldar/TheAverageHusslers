// app/onboarding/page.tsx
import { currentUser } from '@clerk/nextjs/server'
import Form from './form'

export default async function OnboardingPage() {
  const user = await currentUser()

  console.log('User:', user)

  if (!user) {
    return <div>Please log in.</div>
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      <Form
        email={user.emailAddresses[0].emailAddress}
        clerk_id={user.id}
      />
    </main>
  )
}
