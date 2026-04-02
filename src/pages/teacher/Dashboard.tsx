import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, FileCheck, TrendingUp, Plus, ArrowRight, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const stats = [
  { label: "Cours actifs", value: "6", icon: BookOpen, color: "text-primary", bg: "bg-primary/10", trend: "+1" },
  { label: "Etudiants inscrits", value: "342", icon: Users, color: "text-accent", bg: "bg-accent/10", trend: "+28" },
  { label: "A corriger", value: "18", icon: FileCheck, color: "text-chart-5", bg: "bg-chart-5/10", trend: "" },
  { label: "Taux de reussite", value: "87%", icon: TrendingUp, color: "text-chart-3", bg: "bg-chart-3/10", trend: "+3%" },
]

const courses = [
  { id: 1, title: "Developpement Web Full Stack", students: 125, completion: 65, image: "bg-gradient-to-br from-primary/20 to-primary/5" },
  { id: 2, title: "React & Next.js Avance", students: 98, completion: 42, image: "bg-gradient-to-br from-accent/20 to-accent/5" },
  { id: 3, title: "Node.js & APIs", students: 76, completion: 78, image: "bg-gradient-to-br from-chart-3/20 to-chart-3/5" },
]

const pendingTasks = [
  { id: 1, type: "correction", title: "Projet API REST", course: "Developpement Web", count: 12, urgent: true },
  { id: 2, type: "quiz", title: "Quiz SQL Avance", course: "Base de donnees", count: 8, urgent: false },
]

const recentStudents = [
  { name: "Yasmine Benali", course: "Developpement Web", action: "a soumis un devoir", time: "Il y a 15 min", avatar: "YB" },
  { name: "Ahmed Khelifi", course: "React & Next.js", action: "a termine le quiz", time: "Il y a 32 min", avatar: "AK" },
]

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Bonjour, Dr. Mohamed!</h1>
          <p className="text-muted-foreground mt-1">Voici un apercu de votre activite</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Creer un cours
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              {stat.trend && <Badge variant="secondary" className="bg-accent/10 text-accent">{stat.trend}</Badge>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Mes cours
            </CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg ${course.image}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{course.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{course.students} etudiants</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{course.completion}%</p>
                  <Progress value={course.completion} className="w-20 h-1.5 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-chart-5" />
              Taches en attente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className={`flex items-center gap-3 rounded-lg border p-3 ${task.urgent ? "border-destructive/50 bg-destructive/5" : "border-border"}`}>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${task.type === "correction" ? "bg-chart-5/10" : "bg-primary/10"}`}>
                  {task.type === "correction" ? <FileCheck className="h-4 w-4 text-chart-5" /> : <CheckCircle className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                    {task.urgent && <AlertTriangle className="h-3 w-3 text-destructive" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{task.course}</p>
                </div>
                <Badge variant="secondary">{task.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-accent" />
            Activite recente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentStudents.map((student, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">{student.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{student.name}</span>{" "}
                  <span className="text-muted-foreground">{student.action}</span>
                </p>
                <p className="text-xs text-muted-foreground">{student.course}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{student.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
