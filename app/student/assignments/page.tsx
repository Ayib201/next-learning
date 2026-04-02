"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Eye,
  Calendar,
  File,
} from "lucide-react"

const assignments = {
  pending: [
    {
      id: 1,
      title: "Projet API REST",
      course: "Développement Web Full Stack",
      description: "Créer une API RESTful avec Node.js et Express",
      deadline: "25 Mars 2026",
      daysLeft: 3,
      status: "pending",
      maxScore: 20,
    },
    {
      id: 2,
      title: "Modélisation BDD",
      course: "Base de données avancées",
      description: "Concevoir un schéma de base de données pour une application e-commerce",
      deadline: "28 Mars 2026",
      daysLeft: 6,
      status: "pending",
      maxScore: 15,
    },
    {
      id: 3,
      title: "Configuration réseau",
      course: "Réseaux et Sécurité",
      description: "Configurer un réseau virtuel avec VLANs et routage",
      deadline: "1 Avril 2026",
      daysLeft: 10,
      status: "pending",
      maxScore: 25,
    },
  ],
  submitted: [
    {
      id: 4,
      title: "Composants React",
      course: "Développement Web Full Stack",
      submittedDate: "18 Mars 2026",
      status: "graded",
      score: 17,
      maxScore: 20,
      feedback: "Excellent travail! Bon usage des hooks et de la composition de composants.",
    },
    {
      id: 5,
      title: "Requêtes SQL complexes",
      course: "Base de données avancées",
      submittedDate: "15 Mars 2026",
      status: "pending_review",
      maxScore: 15,
    },
    {
      id: 6,
      title: "Analyse de trafic",
      course: "Réseaux et Sécurité",
      submittedDate: "10 Mars 2026",
      status: "graded",
      score: 12,
      maxScore: 15,
      feedback: "Bonne analyse mais manque quelques détails sur les protocoles TCP.",
    },
  ],
}

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("pending")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Mes devoirs</h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos devoirs et soumissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10">
              <FileText className="h-6 w-6 text-chart-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{assignments.pending.length}</p>
              <p className="text-sm text-muted-foreground">À rendre</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{assignments.submitted.length}</p>
              <p className="text-sm text-muted-foreground">Soumis</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {assignments.pending.filter(a => a.daysLeft <= 3).length}
              </p>
              <p className="text-sm text-muted-foreground">Urgents</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            À rendre ({assignments.pending.length})
          </TabsTrigger>
          <TabsTrigger value="submitted" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Soumis ({assignments.submitted.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {assignments.pending.map((assignment) => (
              <Card key={assignment.id} className={assignment.daysLeft <= 3 ? "border-destructive/50" : ""}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                        {assignment.daysLeft <= 3 && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{assignment.course}</p>
                      <p className="text-sm text-foreground/80">{assignment.description}</p>
                      
                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {assignment.deadline}
                        </div>
                        <Badge variant={assignment.daysLeft <= 3 ? "destructive" : "secondary"}>
                          {assignment.daysLeft} jours restants
                        </Badge>
                        <span>Note max: {assignment.maxScore} pts</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Détails
                      </Button>
                      <Button className="gap-2">
                        <Upload className="h-4 w-4" />
                        Soumettre
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="mt-6">
          <div className="space-y-4">
            {assignments.submitted.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{assignment.title}</h3>
                        {assignment.status === "graded" ? (
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            Noté
                          </Badge>
                        ) : (
                          <Badge variant="secondary">En attente de correction</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{assignment.course}</p>
                      
                      {assignment.status === "graded" && (
                        <>
                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Note:</span>
                              <span className="text-lg font-bold text-accent">
                                {assignment.score}/{assignment.maxScore}
                              </span>
                            </div>
                            <Progress 
                              value={(assignment.score! / assignment.maxScore) * 100} 
                              className="w-32 h-2"
                            />
                          </div>
                          {assignment.feedback && (
                            <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                              <p className="text-sm text-foreground/80">
                                <span className="font-medium">Feedback:</span> {assignment.feedback}
                              </p>
                            </div>
                          )}
                        </>
                      )}

                      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          Soumis le {assignment.submittedDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <File className="h-4 w-4" />
                        Voir
                      </Button>
                    </div>
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
