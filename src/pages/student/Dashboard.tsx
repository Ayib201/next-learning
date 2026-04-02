import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  Calendar,
  ArrowRight,
  Play,
  CheckCircle,
  FileText,
  Bell,
} from "lucide-react"

const stats = [
  { label: "Cours inscrits", value: "6", icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
  { label: "Quiz completes", value: "24", icon: CheckCircle, color: "text-accent", bg: "bg-accent/10" },
  { label: "Heures d'etude", value: "48h", icon: Clock, color: "text-chart-3", bg: "bg-chart-3/10" },
  { label: "Certificats", value: "3", icon: Trophy, color: "text-chart-5", bg: "bg-chart-5/10" },
]

const currentCourses = [
  {
    id: 1,
    title: "Developpement Web Full Stack",
    instructor: "Dr. Mohamed Ali",
    progress: 78,
    nextLesson: "React Hooks avances",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
  },
  {
    id: 2,
    title: "Base de donnees avancees",
    instructor: "Prof. Amina Ben",
    progress: 45,
    nextLesson: "Optimisation des requetes",
    image: "bg-gradient-to-br from-accent/20 to-accent/5",
  },
  {
    id: 3,
    title: "Reseaux et Securite",
    instructor: "Dr. Karim Salah",
    progress: 32,
    nextLesson: "Protocoles de securite",
    image: "bg-gradient-to-br from-chart-3/20 to-chart-3/5",
  },
]

const upcomingTasks = [
  { id: 1, title: "Devoir: API REST", course: "Developpement Web", due: "2 jours", type: "assignment" },
  { id: 2, title: "Quiz: SQL avance", course: "Base de donnees", due: "3 jours", type: "quiz" },
  { id: 3, title: "Projet final", course: "Reseaux", due: "1 semaine", type: "project" },
]

const notifications = [
  { id: 1, message: "Nouveau cours disponible: Machine Learning", time: "Il y a 2h" },
  { id: 2, message: "Quiz corrige: JavaScript Basics - 18/20", time: "Il y a 5h" },
  { id: 3, message: "Rappel: Devoir a rendre demain", time: "Il y a 1j" },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Bonjour, Ahmed!
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Continuez votre parcours d'apprentissage"}
          </p>
        </div>
        <Button className="gap-2">
          <Play className="h-4 w-4" />
          Reprendre le cours
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Current courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Mes cours en cours</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {currentCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className={`h-32 w-full sm:h-auto sm:w-40 ${course.image}`} />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        </div>
                        <Badge variant="secondary">{course.progress}%</Badge>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium text-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Prochain: <span className="text-foreground">{course.nextLesson}</span>
                        </p>
                        <Button size="sm" className="gap-1">
                          <Play className="h-3 w-3" />
                          Continuer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming tasks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-primary" />
                Taches a venir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    task.type === "assignment" 
                      ? "bg-primary/10" 
                      : task.type === "quiz" 
                        ? "bg-accent/10" 
                        : "bg-chart-3/10"
                  }`}>
                    {task.type === "assignment" ? (
                      <FileText className="h-4 w-4 text-primary" />
                    ) : task.type === "quiz" ? (
                      <CheckCircle className="h-4 w-4 text-accent" />
                    ) : (
                      <Target className="h-4 w-4 text-chart-3" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.course}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    <Calendar className="mr-1 h-3 w-3" />
                    {task.due}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-chart-5" />
                Notifications recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-3 rounded-lg p-2 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly goal */}
          <Card className="bg-sidebar">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
                  <Trophy className="h-5 w-5 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sidebar-foreground">Objectif hebdo</p>
                  <p className="text-xs text-sidebar-foreground/60">{"5h d'etude par semaine"}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-sidebar-foreground/70">Progression</span>
                  <span className="font-medium text-sidebar-foreground">3.5h / 5h</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
