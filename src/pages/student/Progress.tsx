import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, BookOpen, Trophy } from "lucide-react"

const courseProgress = [
  { name: "Developpement Web", progress: 78, modules: 12, completed: 9 },
  { name: "Base de donnees", progress: 45, modules: 10, completed: 4 },
  { name: "Reseaux", progress: 32, modules: 8, completed: 2 },
  { name: "IA", progress: 15, modules: 15, completed: 2 },
]

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Ma progression</h1>
        <p className="text-muted-foreground mt-1">{"Suivez votre parcours d'apprentissage"}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">72%</p>
              <p className="text-sm text-muted-foreground">Progression globale</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">14.5h</p>
              <p className="text-sm text-muted-foreground">Cette semaine</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/10">
              <BookOpen className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">17/45</p>
              <p className="text-sm text-muted-foreground">Modules completes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10">
              <Trophy className="h-6 w-6 text-chart-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">15.8</p>
              <p className="text-sm text-muted-foreground">Moyenne generale</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-chart-3" />
            Progression par cours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {courseProgress.map((course) => (
            <div key={course.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{course.name}</span>
                <span className="text-sm text-muted-foreground">
                  {course.completed}/{course.modules} modules
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={course.progress} className="flex-1 h-2" />
                <span className="text-sm font-medium text-foreground w-12 text-right">
                  {course.progress}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
