"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Clock,
  Trophy,
  Target,
  BookOpen,
  CheckCircle,
  Calendar,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const weeklyProgress = [
  { day: "Lun", hours: 2.5 },
  { day: "Mar", hours: 1.5 },
  { day: "Mer", hours: 3 },
  { day: "Jeu", hours: 2 },
  { day: "Ven", hours: 4 },
  { day: "Sam", hours: 1 },
  { day: "Dim", hours: 0.5 },
]

const courseProgress = [
  { name: "Développement Web", progress: 78, modules: 12, completed: 9, color: "#6366f1" },
  { name: "Base de données", progress: 45, modules: 10, completed: 4, color: "#10b981" },
  { name: "Réseaux", progress: 32, modules: 8, completed: 2, color: "#f59e0b" },
  { name: "IA", progress: 15, modules: 15, completed: 2, color: "#ec4899" },
]

const skillsDistribution = [
  { name: "Frontend", value: 35, color: "#6366f1" },
  { name: "Backend", value: 25, color: "#10b981" },
  { name: "Database", value: 20, color: "#f59e0b" },
  { name: "Networks", value: 20, color: "#ec4899" },
]

const achievements = [
  { title: "Premier cours terminé", date: "15 Jan 2026", icon: Trophy },
  { title: "10 quiz réussis", date: "20 Fév 2026", icon: CheckCircle },
  { title: "50h d'étude", date: "5 Mars 2026", icon: Clock },
  { title: "Moyenne > 15", date: "10 Mars 2026", icon: Target },
]

export default function ProgressPage() {
  const totalHours = weeklyProgress.reduce((acc, day) => acc + day.hours, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Ma progression</h1>
        <p className="text-muted-foreground mt-1">
          Suivez votre parcours d&apos;apprentissage
        </p>
      </div>

      {/* Stats overview */}
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
              <p className="text-2xl font-bold text-foreground">{totalHours.toFixed(1)}h</p>
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
              <p className="text-sm text-muted-foreground">Modules complétés</p>
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
              <p className="text-sm text-muted-foreground">Moyenne générale</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly activity chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Activité hebdomadaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProgress}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorHours)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skills distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Répartition des compétences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillsDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {skillsDistribution.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="text-xs text-muted-foreground">{skill.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Course progress */}
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

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-chart-5" />
              Réalisations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-5/10">
                  <achievement.icon className="h-5 w-5 text-chart-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
