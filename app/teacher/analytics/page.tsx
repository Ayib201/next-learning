"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  BookOpen,
  Award,
  BarChart3,
  Clock,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyData = [
  { month: "Jan", students: 180, completions: 45 },
  { month: "Fév", students: 220, completions: 62 },
  { month: "Mar", students: 260, completions: 78 },
  { month: "Avr", students: 290, completions: 95 },
  { month: "Mai", students: 320, completions: 112 },
  { month: "Juin", students: 342, completions: 128 },
]

const coursePerformance = [
  { name: "Dev Web", students: 125, avgGrade: 15.2 },
  { name: "React", students: 98, avgGrade: 14.8 },
  { name: "Node.js", students: 76, avgGrade: 16.1 },
  { name: "GraphQL", students: 45, avgGrade: 15.5 },
]

const gradeDistribution = [
  { range: "16-20", count: 85, color: "#10b981" },
  { range: "14-16", count: 120, color: "#6366f1" },
  { range: "12-14", count: 95, color: "#f59e0b" },
  { range: "10-12", count: 32, color: "#ef4444" },
  { range: "< 10", count: 10, color: "#94a3b8" },
]

const stats = [
  { label: "Taux de réussite", value: "87%", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
  { label: "Moyenne générale", value: "15.4", icon: Award, color: "text-primary", bg: "bg-primary/10" },
  { label: "Heures de cours", value: "156h", icon: Clock, color: "text-chart-3", bg: "bg-chart-3/10" },
  { label: "Engagement", value: "78%", icon: BarChart3, color: "text-chart-5", bg: "bg-chart-5/10" },
]

export default function TeacherAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Statistiques</h1>
        <p className="text-muted-foreground mt-1">
          Analysez les performances de vos cours
        </p>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Evolution chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Évolution mensuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                    name="Étudiants"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                  />
                  <Area
                    type="monotone"
                    dataKey="completions"
                    name="Complétions"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCompletions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-chart-5" />
              Distribution des notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
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
            <div className="grid grid-cols-5 gap-2">
              {gradeDistribution.map((item) => (
                <div key={item.range} className="text-center">
                  <div
                    className="h-2 w-full rounded-full mb-1"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-xs font-medium text-foreground">{item.range}</p>
                  <p className="text-xs text-muted-foreground">{item.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            Performance par cours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="students" name="Étudiants" fill="#6366f1" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Course details */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coursePerformance.map((course) => (
          <Card key={course.name}>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground">{course.name}</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Étudiants</span>
                    <span className="font-medium text-foreground">{course.students}</span>
                  </div>
                  <Progress value={(course.students / 150) * 100} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Moyenne</span>
                    <span className="font-medium text-foreground">{course.avgGrade}/20</span>
                  </div>
                  <Progress value={(course.avgGrade / 20) * 100} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
