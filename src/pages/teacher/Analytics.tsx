import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users, TrendingUp, BookOpen } from "lucide-react"

const courseStats = [
  { name: "Developpement Web", students: 125, completion: 65, rating: 4.8 },
  { name: "React & Next.js", students: 98, completion: 42, rating: 4.7 },
  { name: "Node.js & APIs", students: 76, completion: 78, rating: 4.9 },
]

export default function TeacherAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Statistiques</h1>
        <p className="text-muted-foreground mt-1">Analysez les performances de vos cours</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"><Users className="h-6 w-6 text-primary" /></div><div><p className="text-2xl font-bold text-foreground">342</p><p className="text-sm text-muted-foreground">Etudiants</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10"><BookOpen className="h-6 w-6 text-accent" /></div><div><p className="text-2xl font-bold text-foreground">6</p><p className="text-sm text-muted-foreground">Cours</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/10"><TrendingUp className="h-6 w-6 text-chart-3" /></div><div><p className="text-2xl font-bold text-foreground">87%</p><p className="text-sm text-muted-foreground">Taux de reussite</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10"><BarChart3 className="h-6 w-6 text-chart-5" /></div><div><p className="text-2xl font-bold text-foreground">4.8</p><p className="text-sm text-muted-foreground">Note moyenne</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Performance par cours</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {courseStats.map((course) => (
            <div key={course.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{course.name}</span>
                <span className="text-sm text-muted-foreground">{course.students} etudiants</span>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={course.completion} className="flex-1 h-2" />
                <span className="text-sm font-medium w-12">{course.completion}%</span>
                <span className="text-sm text-muted-foreground">Note: {course.rating}/5</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
