"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Users,
  TrendingUp,
  Award,
  Mail,
  Download,
  Filter,
} from "lucide-react"

const students = [
  {
    id: 1,
    name: "Yasmine Benali",
    email: "yasmine.benali@isi.tn",
    avatar: "YB",
    course: "Développement Web Full Stack",
    progress: 85,
    grade: 17.5,
    status: "active",
    lastActive: "Il y a 2h",
  },
  {
    id: 2,
    name: "Ahmed Khelifi",
    email: "ahmed.khelifi@isi.tn",
    avatar: "AK",
    course: "React & Next.js Avancé",
    progress: 72,
    grade: 15.0,
    status: "active",
    lastActive: "Il y a 30 min",
  },
  {
    id: 3,
    name: "Sara Mansour",
    email: "sara.mansour@isi.tn",
    avatar: "SM",
    course: "Node.js & APIs",
    progress: 45,
    grade: 14.5,
    status: "active",
    lastActive: "Il y a 1j",
  },
  {
    id: 4,
    name: "Mohamed Trabelsi",
    email: "mohamed.trabelsi@isi.tn",
    avatar: "MT",
    course: "Développement Web Full Stack",
    progress: 92,
    grade: 18.0,
    status: "active",
    lastActive: "Il y a 5h",
  },
  {
    id: 5,
    name: "Fatima Zohra",
    email: "fatima.zohra@isi.tn",
    avatar: "FZ",
    course: "React & Next.js Avancé",
    progress: 38,
    grade: 12.5,
    status: "inactive",
    lastActive: "Il y a 1 semaine",
  },
  {
    id: 6,
    name: "Karim Salah",
    email: "karim.salah@isi.tn",
    avatar: "KS",
    course: "GraphQL avec Apollo",
    progress: 100,
    grade: 19.0,
    status: "completed",
    lastActive: "Il y a 3j",
  },
]

const stats = [
  { label: "Total étudiants", value: "342", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Moyenne générale", value: "15.8", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
  { label: "Taux de réussite", value: "87%", icon: Award, color: "text-chart-5", bg: "bg-chart-5/10" },
]

export default function TeacherStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = courseFilter === "all" || student.course === courseFilter
    return matchesSearch && matchesCourse
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Mes étudiants</h1>
          <p className="text-muted-foreground mt-1">
            Suivez la progression de vos étudiants
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
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

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un étudiant..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-full sm:w-64">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filtrer par cours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les cours</SelectItem>
            <SelectItem value="Développement Web Full Stack">Développement Web Full Stack</SelectItem>
            <SelectItem value="React & Next.js Avancé">React & Next.js Avancé</SelectItem>
            <SelectItem value="Node.js & APIs">Node.js & APIs</SelectItem>
            <SelectItem value="GraphQL avec Apollo">GraphQL avec Apollo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base">
            {filteredStudents.length} étudiant(s)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Étudiant</TableHead>
                <TableHead className="hidden md:table-cell">Cours</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead className="hidden sm:table-cell">Note</TableHead>
                <TableHead className="hidden lg:table-cell">Dernière activité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <p className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {student.course}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.progress} className="w-16 h-1.5" />
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={student.grade >= 14 ? "default" : "secondary"}>
                      {student.grade}/20
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${
                        student.status === "active" ? "bg-accent" :
                        student.status === "completed" ? "bg-primary" : "bg-muted-foreground"
                      }`} />
                      <span className="text-sm text-muted-foreground">{student.lastActive}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Mail className="h-4 w-4" />
                      <span className="hidden sm:inline">Contacter</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
