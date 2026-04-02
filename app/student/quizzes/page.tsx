"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Clock,
  FileQuestion,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Trophy,
  Target,
  AlertCircle,
} from "lucide-react"

const quizzes = {
  available: [
    {
      id: 1,
      title: "Quiz: React Hooks",
      course: "Développement Web Full Stack",
      questions: 15,
      duration: "20 min",
      difficulty: "Intermédiaire",
      deadline: "Dans 3 jours",
    },
    {
      id: 2,
      title: "Quiz: SQL Avancé",
      course: "Base de données avancées",
      questions: 20,
      duration: "30 min",
      difficulty: "Avancé",
      deadline: "Dans 5 jours",
    },
    {
      id: 3,
      title: "Quiz: Protocoles réseau",
      course: "Réseaux et Sécurité",
      questions: 10,
      duration: "15 min",
      difficulty: "Facile",
      deadline: "Dans 1 semaine",
    },
  ],
  completed: [
    {
      id: 4,
      title: "Quiz: JavaScript Basics",
      course: "Développement Web Full Stack",
      score: 18,
      total: 20,
      date: "15 Mars 2026",
      passed: true,
    },
    {
      id: 5,
      title: "Quiz: Normalisation BDD",
      course: "Base de données avancées",
      score: 14,
      total: 20,
      date: "12 Mars 2026",
      passed: true,
    },
    {
      id: 6,
      title: "Quiz: Introduction aux réseaux",
      course: "Réseaux et Sécurité",
      score: 8,
      total: 15,
      date: "10 Mars 2026",
      passed: false,
    },
  ],
}

export default function QuizzesPage() {
  const [activeTab, setActiveTab] = useState("available")

  const avgScore = quizzes.completed.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / quizzes.completed.length
  const passedCount = quizzes.completed.filter(q => q.passed).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Quiz et Évaluations</h1>
        <p className="text-muted-foreground mt-1">
          Testez vos connaissances et suivez vos résultats
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{avgScore.toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground">Moyenne générale</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{passedCount}/{quizzes.completed.length}</p>
              <p className="text-sm text-muted-foreground">Quiz réussis</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10">
              <FileQuestion className="h-6 w-6 text-chart-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{quizzes.available.length}</p>
              <p className="text-sm text-muted-foreground">Quiz à faire</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="available" className="gap-2">
            <FileQuestion className="h-4 w-4" />
            Disponibles ({quizzes.available.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Complétés ({quizzes.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.available.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant={
                      quiz.difficulty === "Facile" ? "secondary" :
                      quiz.difficulty === "Intermédiaire" ? "default" : "destructive"
                    }>
                      {quiz.difficulty}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {quiz.deadline}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2 text-lg">{quiz.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{quiz.course}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <FileQuestion className="h-4 w-4" />
                      {quiz.questions} questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {quiz.duration}
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Commencer le quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {quizzes.completed.map((quiz) => (
              <Card key={quiz.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    quiz.passed ? "bg-accent/10" : "bg-destructive/10"
                  }`}>
                    {quiz.passed ? (
                      <CheckCircle className="h-6 w-6 text-accent" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{quiz.title}</h3>
                    <p className="text-sm text-muted-foreground">{quiz.course}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      quiz.passed ? "text-accent" : "text-destructive"
                    }`}>
                      {quiz.score}/{quiz.total}
                    </p>
                    <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <RotateCcw className="h-3 w-3" />
                      Refaire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
