import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileQuestion, Target, Trophy, Play } from "lucide-react"

const quizzes = [
  { id: 1, title: "Quiz: React Hooks", course: "Developpement Web", questions: 15, duration: "20 min", deadline: "Dans 3 jours" },
  { id: 2, title: "Quiz: SQL Avance", course: "Base de donnees", questions: 20, duration: "30 min", deadline: "Dans 5 jours" },
  { id: 3, title: "Quiz: Protocoles reseau", course: "Reseaux et Securite", questions: 10, duration: "15 min", deadline: "Dans 1 semaine" },
]

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Quiz et Evaluations</h1>
        <p className="text-muted-foreground mt-1">Testez vos connaissances et suivez vos resultats</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">82%</p>
              <p className="text-sm text-muted-foreground">Moyenne generale</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5/6</p>
              <p className="text-sm text-muted-foreground">Quiz reussis</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10">
              <FileQuestion className="h-6 w-6 text-chart-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{quizzes.length}</p>
              <p className="text-sm text-muted-foreground">Quiz a faire</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <Badge variant="outline">{quiz.deadline}</Badge>
              <CardTitle className="mt-2 text-lg">{quiz.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{quiz.course}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>{quiz.questions} questions</span>
                <span>{quiz.duration}</span>
              </div>
              <Button className="w-full gap-2">
                <Play className="h-4 w-4" />
                Commencer le quiz
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
