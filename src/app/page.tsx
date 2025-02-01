import IMCCalculator from "@/components/IMCCalculator"
import AuthWrapper from "@/components/AuthWrapper"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Calculateur d&apos;IMC</h1>
      <AuthWrapper>
        <IMCCalculator />
      </AuthWrapper>
    </main>
  )
}

