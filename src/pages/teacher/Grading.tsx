import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileCheck, Clock, AlertTriangle } from "lucide-react"

const submissions = [
  { id: 1, student: "Yasmine Benali", assignment: "Projet API REST", course: "Developpement Web", date: "Il y a 2h", urgent: true },
  { id: 2, student: "Ahmed Khelifi", assignment: "Modelisation BDD", course: "Base de donnees", date: "Il y a 5h", urgent: false },
  { id: 3, student: "Sara Mansour", assignment: "Config Reseau", course: "Reseaux", date: "Il y a 1j", urgent: false },
]

export default function TeacherGradingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Corrections</h1>
        <p className="text-muted-foreground mt-1">Devoirs et quiz a corriger</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10"><FileCheck className="h-6 w-6 text-chart-5" /></div><div><p className="text-2xl font-bold text-foreground">{submissions.length}</p><p className="text-sm text-muted-foreground">A corriger</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10"><AlertTriangle className="h-6 w-6 text-destructive" /></div><div><p className="text-2xl font-bold text-foreground">{submissions.filter(s => s.urgent).length}</p><p className="text-sm text-muted-foreground">Urgents</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10"><Clock className="h-6 w-6 text-accent" /></div><div><p className="text-2xl font-bold text-foreground">24</p><p className="text-sm text-muted-foreground">Corriges cette semaine</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Soumissions en attente</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className={`flex items-center gap-4 p-4 rounded-lg border ${sub.urgent ? "border-destructive/50 bg-destructive/5" : "border-border"}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{sub.assignment}</p>
                  {sub.urgent && <Badge variant="destructive">Urgent</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{sub.student} - {sub.course}</p>
                <p className="text-xs text-muted-foreground mt-1">{sub.date}</p>
              </div>
              <Button>Corriger</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
