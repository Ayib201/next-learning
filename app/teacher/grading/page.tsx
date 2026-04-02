"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  FileCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Send,
  FileText,
} from "lucide-react"

const submissions = {
  pending: [
    {
      id: 1,
      student: { name: "Yasmine Benali", avatar: "YB" },
      assignment: "Projet API REST",
      course: "Développement Web Full Stack",
      submittedAt: "22 Mars 2026 - 14:30",
      maxScore: 20,
      urgent: true,
    },
    {
      id: 2,
      student: { name: "Ahmed Khelifi", avatar: "AK" },
      assignment: "Projet API REST",
      course: "Développement Web Full Stack",
      submittedAt: "22 Mars 2026 - 10:15",
      maxScore: 20,
      urgent: true,
    },
    {
      id: 3,
      student: { name: "Sara Mansour", avatar: "SM" },
      assignment: "TP React Hooks",
      course: "React & Next.js Avancé",
      submittedAt: "21 Mars 2026 - 18:45",
      maxScore: 15,
      urgent: false,
    },
    {
      id: 4,
      student: { name: "Mohamed Trabelsi", avatar: "MT" },
      assignment: "Quiz SQL Avancé",
      course: "Base de données",
      submittedAt: "20 Mars 2026 - 09:00",
      maxScore: 20,
      urgent: false,
    },
  ],
  graded: [
    {
      id: 5,
      student: { name: "Karim Salah", avatar: "KS" },
      assignment: "Composants React",
      course: "Développement Web Full Stack",
      submittedAt: "18 Mars 2026",
      gradedAt: "19 Mars 2026",
      score: 17,
      maxScore: 20,
    },
    {
      id: 6,
      student: { name: "Fatima Zohra", avatar: "FZ" },
      assignment: "Requêtes SQL",
      course: "Base de données",
      submittedAt: "15 Mars 2026",
      gradedAt: "16 Mars 2026",
      score: 14,
      maxScore: 15,
    },
  ],
}

export default function GradingPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [gradingModal, setGradingModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<typeof submissions.pending[0] | null>(null)
  const [grade, setGrade] = useState("")
  const [feedback, setFeedback] = useState("")

  const openGradingModal = (submission: typeof submissions.pending[0]) => {
    setSelectedSubmission(submission)
    setGrade("")
    setFeedback("")
    setGradingModal(true)
  }

  const handleGrade = () => {
    // Handle grading logic
    setGradingModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Corrections</h1>
        <p className="text-muted-foreground mt-1">
          Corrigez les soumissions de vos étudiants
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10">
              <Clock className="h-6 w-6 text-chart-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{submissions.pending.length}</p>
              <p className="text-sm text-muted-foreground">En attente</p>
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
                {submissions.pending.filter(s => s.urgent).length}
              </p>
              <p className="text-sm text-muted-foreground">Urgentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{submissions.graded.length}</p>
              <p className="text-sm text-muted-foreground">Corrigées cette semaine</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            À corriger ({submissions.pending.length})
          </TabsTrigger>
          <TabsTrigger value="graded" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Corrigées ({submissions.graded.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {submissions.pending.map((submission) => (
              <Card key={submission.id} className={submission.urgent ? "border-destructive/50" : ""}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {submission.student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{submission.student.name}</h3>
                          {submission.urgent && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                        <p className="text-xs text-muted-foreground">{submission.course}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Soumis le</p>
                        <p className="text-sm font-medium text-foreground">{submission.submittedAt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          Voir
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="gap-1" onClick={() => openGradingModal(submission)}>
                          <FileCheck className="h-4 w-4" />
                          Corriger
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="mt-6">
          <div className="space-y-4">
            {submissions.graded.map((submission) => (
              <Card key={submission.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-accent/10 text-accent text-sm">
                          {submission.student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-foreground">{submission.student.name}</h3>
                        <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                        <p className="text-xs text-muted-foreground">{submission.course}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-accent/10 text-accent text-lg px-3 py-1">
                        {submission.score}/{submission.maxScore}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Corrigé le</p>
                        <p className="text-sm font-medium text-foreground">{submission.gradedAt}</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileText className="h-4 w-4" />
                        Détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Grading Modal */}
      <Dialog open={gradingModal} onOpenChange={setGradingModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Corriger le devoir</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {selectedSubmission.student.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{selectedSubmission.student.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.assignment}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Note (sur {selectedSubmission.maxScore})</Label>
                <Input
                  id="grade"
                  type="number"
                  min={0}
                  max={selectedSubmission.maxScore}
                  placeholder={`0 - ${selectedSubmission.maxScore}`}
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Commentaire / Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Ajoutez un commentaire pour l'étudiant..."
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setGradingModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleGrade} className="gap-2">
              <Send className="h-4 w-4" />
              Envoyer la note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
