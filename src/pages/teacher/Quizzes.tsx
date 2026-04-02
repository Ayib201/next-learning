import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileQuestion, Users, CheckCircle } from "lucide-react"

const quizzes = [
  { id: 1, title: "Quiz: React Hooks", course: "Developpement Web", questions: 15, submissions: 45, avgScore: 78 },
  { id: 2, title: "Quiz: SQL Avance", course: "Base de donnees", questions: 20, submissions: 38, avgScore: 72 },
  { id: 3, title: "Quiz: Protocoles", course: "Reseaux", questions: 10, submissions: 32, avgScore: 85 },
]

export default function TeacherQuizzesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Quiz</h1>
          <p className="text-muted-foreground mt-1">Creez et gerez vos quiz</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" />Nouveau quiz</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"><FileQuestion className="h-6 w-6 text-primary" /></div><div><p className="text-2xl font-bold text-foreground">{quizzes.length}</p><p className="text-sm text-muted-foreground">Total quiz</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10"><Users className="h-6 w-6 text-accent" /></div><div><p className="text-2xl font-bold text-foreground">{quizzes.reduce((a, q) => a + q.submissions, 0)}</p><p className="text-sm text-muted-foreground">Soumissions</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/10"><CheckCircle className="h-6 w-6 text-chart-3" /></div><div><p className="text-2xl font-bold text-foreground">{Math.round(quizzes.reduce((a, q) => a + q.avgScore, 0) / quizzes.length)}%</p><p className="text-sm text-muted-foreground">Moyenne</p></div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader><CardTitle className="text-lg">{quiz.title}</CardTitle><p className="text-sm text-muted-foreground">{quiz.course}</p></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-muted-foreground">{quiz.questions} questions</span>
                <Badge variant="secondary">{quiz.submissions} soumissions</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Moyenne: <span className="font-medium text-foreground">{quiz.avgScore}%</span></span>
                <Button variant="outline" size="sm">Voir details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
