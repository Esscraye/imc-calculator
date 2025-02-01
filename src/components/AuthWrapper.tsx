"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"
import Link from "next/link"

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Chargement...</div>
  }

  if (status === "unauthenticated") {
    return (
      <Button asChild>
        <Link href="/api/auth/signin">Se connecter</Link>
      </Button>
    )
  }

  return (
    <>
      <p className="mb-4">Connecté en tant que {session?.user?.name}</p>
      {children}
      <Button className="mt-4" asChild>
        <Link href="/api/auth/signout">Se déconnecter</Link>
      </Button>
    </>
  )
}

