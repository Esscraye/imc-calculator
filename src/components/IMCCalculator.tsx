'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryView } from "./HistoryView"
import { toast } from "@/hooks/use-toast"

export default function IMCCalculator() {
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [imc, setIMC] = useState<number | null>(null)
  const [history, setHistory] = useState([])
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetchHistory()
    }
  }, [session])

  const calculateIMC = async () => {
    const imcValue = weight / ((height / 100) * (height / 100))
    setIMC(Number.parseFloat(imcValue.toFixed(2)))

    if (session) {
      try {
        await saveIMC(height, weight, imcValue)
        await fetchHistory()
        toast({
          title: "IMC enregistré",
          description: "Votre IMC a été sauvegardé avec succès.",
        })
      } catch {
        toast({
          title: "Erreur",
          description: "Impossible de sauvegarder l'IMC.",
          variant: "destructive",
        })
      }
    }
  }

  const saveIMC = async (height: number, weight: number, imc: number) => {
    const response = await fetch("/api/imc/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ height, weight, imc }),
    })
    if (!response.ok) {
      throw new Error("Failed to save IMC")
    }
  }

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/imc/history")
      if (response.ok) {
        const data = await response.json()
        setHistory(data)
      } else {
        throw new Error("Failed to fetch history")
      }
    } catch (error) {
      console.error("Failed to fetch IMC history:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger l'historique.",
        variant: "destructive",
      })
    }
  }

  const handleHeightChange = (value: number) => {
    setHeight(Math.min(Math.max(value, 100), 250))
  }

  const handleWeightChange = (value: number) => {
    setWeight(Math.min(Math.max(value, 30), 200))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Calculez votre IMC</CardTitle>
      </CardHeader>
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculateur</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        <TabsContent value="calculator">
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Taille: {height} cm</label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[height]}
                    onValueChange={(value) => handleHeightChange(value[0])}
                    min={100}
                    max={250}
                    step={1}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Poids: {weight} kg</label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[weight]}
                    onValueChange={(value) => handleWeightChange(value[0])}
                    min={30}
                    max={200}
                    step={1}
                    className="flex-grow"
                  />
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => handleWeightChange(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>
            </div>
            <Button onClick={calculateIMC} className="w-full mt-8">
              Calculer l&apos;IMC
            </Button>
            {imc !== null && (
              <div className="text-center mt-4">
                <p className="text-lg font-semibold">Votre IMC est : {imc.toFixed(2)}</p>
                <p className="text-sm mt-2">
                  {imc < 18.5 && "Insuffisance pondérale"}
                  {imc >= 18.5 && imc < 25 && "Corpulence normale"}
                  {imc >= 25 && imc < 30 && "Surpoids"}
                  {imc >= 30 && "Obésité"}
                </p>
              </div>
            )}
          </CardContent>
        </TabsContent>
        <TabsContent value="history">
          <CardContent>
            <HistoryView history={history} />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

