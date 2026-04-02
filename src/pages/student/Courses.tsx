import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Users,
  Star,
  Search,
  Play,
  BookOpen,
  Filter,
  Grid3X3,
  List,
} from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Developpement Web Full Stack",
    instructor: "Dr. Mohamed Ali",
    category: "Informatique",
    level: "Intermediaire",
    duration: "40h",
    students: 1250,
    rating: 4.9,
    progress: 78,
    modules: 12,
    completedModules: 9,
    status: "enrolled",
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
  },
  {
    id: 2,
    title: "Base de donnees avancees",
    instructor: "Prof. Amina Ben",
    category: "Data Science",
    level: "Avance",
    duration: "35h",
    students: 890,
    rating: 4.8,
    progress: 45,
    modules: 10,
    completedModules: 4,
    status: "enrolled",
    image: "bg-gradient-to-br from-accent/20 to-accent/5",
  },
  {
    id: 3,
    title: "Reseaux et Securite",
    instructor: "Dr. Karim Salah",
    category: "Cybersecurite",
    level: "Intermediaire",
    duration: "30h",
    students: 675,
    rating: 4.7,
    progress: 32,
    modules: 8,
    completedModules: 2,
    status: "enrolled",
    image: "bg-gradient-to-br from-chart-3/20 to-chart-3/5",
  },
  {
    id: 4,
    title: "Intelligence Artificielle",
    instructor: "Prof. Sara Mansour",
    category: "IA & ML",
    level: "Avance",
    duration: "50h",
    students: 1100,
    rating: 4.9,
    progress: 0,
    modules: 15,
    completedModules: 0,
    status: "available",
    image: "bg-gradient-to-br from-chart-4/20 to-chart-4/5",
  },
  {
    id: 5,
    title: "DevOps et CI/CD",
    instructor: "Dr. Youssef Hmidi",
    category: "Informatique",
    level: "Avance",
    duration: "25h",
    students: 450,
    rating: 4.6,
    progress: 100,
    modules: 6,
    completedModules: 6,
    status: "completed",
    image: "bg-gradient-to-br from-chart-5/20 to-chart-5/5",
  },
  {
    id: 6,
    title: "Python pour Data Science",
    instructor: "Prof. Nadia Rached",
    category: "Data Science",
    level: "Debutant",
    duration: "30h",
    students: 2100,
    rating: 4.8,
    progress: 100,
    modules: 10,
    completedModules: 10,
    status: "completed",
    image: "bg-gradient-to-br from-destructive/20 to-destructive/5",
  },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [view, setView] = useState<"grid" | "list">("grid")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || course.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Mes cours</h1>
        <p className="text-muted-foreground mt-1">
          Gerez et suivez tous vos cours
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="enrolled">En cours</TabsTrigger>
            <TabsTrigger value="completed">Termines</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <div className="hidden sm:flex items-center border border-border rounded-lg">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setView("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Courses grid */}
      <div className={view === "grid" 
        ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
        : "space-y-4"
      }>
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className={view === "grid" ? "p-0" : "p-0"}>
              <div className={view === "grid" ? "" : "flex"}>
                {/* Course image */}
                <div className={`relative ${course.image} ${view === "grid" ? "h-40" : "h-auto w-48 shrink-0"}`}>
                  <Badge className="absolute top-3 left-3 bg-card/90 text-foreground">
                    {course.category}
                  </Badge>
                  {course.status === "completed" && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      Termine
                    </Badge>
                  )}
                  {course.status === "enrolled" && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                      En cours
                    </Badge>
                  )}
                </div>

                {/* Course content */}
                <div className="flex-1 p-4">
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.instructor}
                  </p>

                  {/* Stats */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-chart-5 text-chart-5" />
                      {course.rating}
                    </div>
                  </div>

                  {/* Progress */}
                  {course.status !== "available" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          {course.completedModules}/{course.modules} modules
                        </span>
                        <span className="font-medium text-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2">
                    {course.status === "enrolled" && (
                      <Button size="sm" className="flex-1 gap-1">
                        <Play className="h-3 w-3" />
                        Continuer
                      </Button>
                    )}
                    {course.status === "completed" && (
                      <Button size="sm" variant="outline" className="flex-1 gap-1">
                        <BookOpen className="h-3 w-3" />
                        Revoir
                      </Button>
                    )}
                    {course.status === "available" && (
                      <Button size="sm" className="flex-1">
                        {"S'inscrire"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium text-foreground">Aucun cours trouve</p>
          <p className="text-sm text-muted-foreground">Essayez de modifier vos filtres</p>
        </div>
      )}
    </div>
  )
}
