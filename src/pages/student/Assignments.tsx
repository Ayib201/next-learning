import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, AlertTriangle, Calendar } from "lucide-react"

const assignments = [
  { id: 1, title: "Projet API REST", course: "Developpement Web", deadline: "25 Mars 2026", daysLeft: 3, maxScore: 20 },
  { id: 2, title: "Modelisation BDD", course: "Base de donnees", deadline: "28 Mars 2026", daysLeft: 6, maxScore: 15 },
  { id: 3, title: "Configuration reseau", course: "Reseaux et Securite", deadline: "1 Avril 2026", daysLeft: 10, maxScore: 25 },
]

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Mes devoirs</h1>
        <p className="text-muted-foreground mt-1">Gerez vos devoirs et soumissions</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10">
              <FileText className="h-6 w-6 text-chart-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{assignments.length}</p>
              <p className="text-sm text-muted-foreground">A rendre</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Soumis</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">Urgents</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className={assignment.daysLeft <= 3 ? "border-destructive/50" : ""}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                    {assignment.daysLeft <= 3 && <Badge variant="destructive">Urgent</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {assignment.deadline}
                    </div>
                    <Badge variant={assignment.daysLeft <= 3 ? "destructive" : "secondary"}>
                      {assignment.daysLeft} jours restants
                    </Badge>
                    <span>Note max: {assignment.maxScore} pts</span>
                  </div>
                </div>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Soumettre
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
