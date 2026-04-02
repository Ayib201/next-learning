"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Copy,
} from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Développement Web Full Stack",
    description: "Apprenez à créer des applications web complètes avec les technologies modernes",
    students: 125,
    modules: 12,
    duration: "40h",
    status: "published",
    progress: 65,
    lastUpdated: "Il y a 2 jours",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
  },
  {
    id: 2,
    title: "React & Next.js Avancé",
    description: "Maîtrisez React et Next.js pour créer des applications performantes",
    students: 98,
    modules: 10,
    duration: "35h",
    status: "published",
    progress: 42,
    lastUpdated: "Il y a 1 semaine",
    image: "bg-gradient-to-br from-accent/20 to-accent/5",
  },
  {
    id: 3,
    title: "Node.js & APIs RESTful",
    description: "Construisez des APIs robustes avec Node.js et Express",
    students: 76,
    modules: 8,
    duration: "30h",
    status: "published",
    progress: 78,
    lastUpdated: "Il y a 3 jours",
    image: "bg-gradient-to-br from-chart-3/20 to-chart-3/5",
  },
  {
    id: 4,
    title: "TypeScript Fondamentaux",
    description: "Introduction à TypeScript pour les développeurs JavaScript",
    students: 0,
    modules: 6,
    duration: "20h",
    status: "draft",
    progress: 30,
    lastUpdated: "Il y a 1 jour",
    image: "bg-gradient-to-br from-chart-4/20 to-chart-4/5",
  },
  {
    id: 5,
    title: "GraphQL avec Apollo",
    description: "Apprenez GraphQL et Apollo pour des APIs modernes",
    students: 45,
    modules: 7,
    duration: "25h",
    status: "published",
    progress: 100,
    lastUpdated: "Il y a 2 semaines",
    image: "bg-gradient-to-br from-chart-5/20 to-chart-5/5",
  },
]

export default function TeacherCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Mes cours</h1>
          <p className="text-muted-foreground mt-1">
            Gérez et créez vos cours
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/teacher/courses/new">
            <Plus className="h-4 w-4" />
            Nouveau cours
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un cours..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{courses.length}</p>
            <p className="text-sm text-muted-foreground">Total cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{courses.filter(c => c.status === "published").length}</p>
            <p className="text-sm text-muted-foreground">Publiés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{courses.filter(c => c.status === "draft").length}</p>
            <p className="text-sm text-muted-foreground">Brouillons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{courses.reduce((acc, c) => acc + c.students, 0)}</p>
            <p className="text-sm text-muted-foreground">Total étudiants</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Course image */}
              <div className={`relative h-32 ${course.image}`}>
                <Badge 
                  className={`absolute top-3 right-3 ${
                    course.status === "published" 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {course.status === "published" ? "Publié" : "Brouillon"}
                </Badge>
              </div>

              {/* Course content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {course.title}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                      </DropdownMenuItem>
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
                
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.modules} modules
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Complétion moyenne</span>
                    <span className="font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Mis à jour {course.lastUpdated}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium text-foreground">Aucun cours trouvé</p>
          <p className="text-sm text-muted-foreground">Créez votre premier cours</p>
          <Button className="mt-4 gap-2" asChild>
            <Link href="/teacher/courses/new">
              <Plus className="h-4 w-4" />
              Créer un cours
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
