"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreVertical,
  Users,
  Clock,
  FileQuestion,
  Edit,
  Trash2,
  Eye,
  Copy,
  BarChart3,
} from "lucide-react"

const quizzes = [
  {
    id: 1,
    title: "Quiz: React Hooks",
    course: "Développement Web Full Stack",
    questions: 15,
    duration: "20 min",
    attempts: 89,
    avgScore: 14.2,
    status: "published",
    createdAt: "20 Mars 2026",
  },
  {
    id: 2,
    title: "Quiz: SQL Avancé",
    course: "Base de données avancées",
    questions: 20,
    duration: "30 min",
    attempts: 65,
    avgScore: 13.8,
    status: "published",
    createdAt: "18 Mars 2026",
  },
  {
    id: 3,
    title: "Quiz: Node.js Basics",
    course: "Node.js & APIs",
    questions: 12,
    duration: "15 min",
    attempts: 54,
    avgScore: 15.5,
    status: "published",
    createdAt: "15 Mars 2026",
  },
  {
    id: 4,
    title: "Quiz: TypeScript Fondamentaux",
    course: "TypeScript",
    questions: 10,
    duration: "15 min",
    attempts: 0,
    avgScore: 0,
    status: "draft",
    createdAt: "22 Mars 2026",
  },
]

export default function TeacherQuizzesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.course.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Mes Quiz</h1>
          <p className="text-muted-foreground mt-1">
            Créez et gérez vos évaluations
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/teacher/quizzes/new">
            <Plus className="h-4 w-4" />
            Nouveau quiz
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un quiz..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{quizzes.length}</p>
            <p className="text-sm text-muted-foreground">Total quiz</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{quizzes.filter(q => q.status === "published").length}</p>
            <p className="text-sm text-muted-foreground">Publiés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{quizzes.reduce((acc, q) => acc + q.attempts, 0)}</p>
            <p className="text-sm text-muted-foreground">Total tentatives</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">14.5</p>
            <p className="text-sm text-muted-foreground">Moyenne globale</p>
          </CardContent>
        </Card>
      </div>

      {/* Quizzes list */}
      <div className="space-y-4">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <FileQuestion className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{quiz.title}</h3>
                      <Badge variant={quiz.status === "published" ? "default" : "secondary"}>
                        {quiz.status === "published" ? "Publié" : "Brouillon"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{quiz.course}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileQuestion className="h-3.5 w-3.5" />
                        {quiz.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {quiz.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {quiz.attempts} tentatives
                      </span>
                      {quiz.avgScore > 0 && (
                        <span className="flex items-center gap-1">
                          <BarChart3 className="h-3.5 w-3.5" />
                          Moy: {quiz.avgScore}/20
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <BarChart3 className="h-4 w-4" />
                    Stats
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Aperçu
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <FileQuestion className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium text-foreground">Aucun quiz trouvé</p>
          <p className="text-sm text-muted-foreground">Créez votre premier quiz</p>
          <Button className="mt-4 gap-2" asChild>
            <Link href="/teacher/quizzes/new">
              <Plus className="h-4 w-4" />
              Créer un quiz
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
