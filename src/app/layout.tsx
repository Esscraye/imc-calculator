import { Providers } from "@/components/Providers"
import type { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}

