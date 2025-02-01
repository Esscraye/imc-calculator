import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface HistoryRecord {
  created_at: string
  height: number
  weight: number
  imc: number
}

interface HistoryViewProps {
  history: HistoryRecord[]
}

export function HistoryView({ history }: HistoryViewProps) {
  return (
    <div className="w-full">
      {history.length === 0 ? (
        <p className="text-center text-muted-foreground">Aucun historique disponible</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Taille (cm)</TableHead>
              <TableHead>Poids (kg)</TableHead>
              <TableHead>IMC</TableHead>
              <TableHead>Catégorie</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(record.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{record.height}</TableCell>
                <TableCell>{record.weight}</TableCell>
                <TableCell>{record.imc.toFixed(2)}</TableCell>
                <TableCell>
                  {record.imc < 18.5 && "Insuffisance pondérale"}
                  {record.imc >= 18.5 && record.imc < 25 && "Corpulence normale"}
                  {record.imc >= 25 && record.imc < 30 && "Surpoids"}
                  {record.imc >= 30 && "Obésité"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

