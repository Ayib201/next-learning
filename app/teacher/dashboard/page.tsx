"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Users,
  FileCheck,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const stats = [
  { label: "Cours actifs", value: "6", icon: BookOpen, color: "text-primary", bg: "bg-primary/10", trend: "+1" },
  { label: "Étudiants inscrits", value: "342", icon: Users, color: "text-accent", bg: "bg-accent/10", trend: "+28" },
  { label: "À corriger", value: "18", icon: FileCheck, color: "text-chart-5", bg: "bg-chart-5/10", trend: "" },
  { label: "Taux de réussite", value: "87%", icon: TrendingUp, color: "text-chart-3", bg: "bg-chart-3/10", trend: "+3%" },
]

const enrollmentData = [
  { month: "Jan", students: 180 },
  { month: "Fév", students: 220 },
  { month: "Mar", students: 260 },
  { month: "Avr", students: 290 },
  { month: "Mai", students: 320 },
  { month: "Juin", students: 342 },
]

const courses = [
  { id: 1, title: "Développement Web Full Stack", students: 125, completion: 65, image: "bg-gradient-to-br from-primary/20 to-primary/5" },
  { id: 2, title: "React & Next.js Avancé", students: 98, completion: 42, image: "bg-gradient-to-br from-accent/20 to-accent/5" },
  { id: 3, title: "Node.js & APIs", students: 76, completion: 78, image: "bg-gradient-to-br from-chart-3/20 to-chart-3/5" },
]

const pendingTasks = [
  { id: 1, type: "correction", title: "Projet API REST", course: "Développement Web", count: 12, urgent: true },
  { id: 2, type: "quiz", title: "Quiz SQL Avancé", course: "Base de données", count: 8, urgent: false },
  { id: 3, type: "correction", title: "TP React Hooks", course: "React & Next.js", count: 6, urgent: false },
]

const recentStudents = [
  { name: "Yasmine Benali", course: "Développement Web", action: "a soumis un devoir", time: "Il y a 15 min", avatar: "YB" },
  { name: "Ahmed Khelifi", course: "React & Next.js", action: "a terminé le quiz", time: "Il y a 32 min", avatar: "AK" },
  { name: "Sara Mansour", course: "Node.js & APIs", action: "s'est inscrite", time: "Il y a 1h", avatar: "SM" },
]

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Bonjour, Dr. Mohamed!
          </h1>
          <p className="text-muted-foreground mt-1">
            Voici un aperçu de votre activité
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Créer un cours
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
              <div className="flex-1">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              {stat.trend && (
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  {stat.trend}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Évolution des inscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pending tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-chart-5" />
              Tâches en attente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  task.urgent ? "border-destructive/50 bg-destructive/5" : "border-border"
                }`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  task.type === "correction" ? "bg-chart-5/10" : "bg-primary/10"
                }`}>
                  {task.type === "correction" ? (
                    <FileCheck className="h-4 w-4 text-chart-5" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {task.title}
                    </p>
                    {task.urgent && <AlertTriangle className="h-3 w-3 text-destructive" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{task.course}</p>
                </div>
                <Badge variant="secondary">{task.count}</Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full gap-1 mt-2">
              Voir tout
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* My courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-primary" />
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
                  <p className="text-sm font-medium text-foreground truncate">
                    {course.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{course.students} étudiants</span>
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

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-accent" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentStudents.map((student, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {student.avatar}
                  </AvatarFallback>
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
    </div>
  )
}
