import { signIn, signOut, auth } from "@/auth"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

export default async function AuthWrapper({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session) {
    return (
      <form
      action={async () => {
        "use server"
        await signIn("github")
      }}>
        <Button className="mt-4" type="submit">Se connecter avec GitHub</Button>
      </form>
    )
  }

  return (
    <>
      <p className="mb-4">Connecté en tant que {session.user?.name}</p>
      {children}
      <form
      action={async () => {
        "use server"
        await signOut()
      }}>
        <Button className="mt-4" type="submit">Se déconnecter</Button>
      </form>
    </>
  )
}

