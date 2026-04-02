import { useState } from "react"
import { Link } from "react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Users, Clock, BookOpen } from "lucide-react"

const courses = [
  { id: 1, title: "Developpement Web Full Stack", students: 125, modules: 12, duration: "40h", status: "published", progress: 65, image: "bg-gradient-to-br from-primary/20 to-primary/5" },
  { id: 2, title: "React & Next.js Avance", students: 98, modules: 10, duration: "35h", status: "published", progress: 42, image: "bg-gradient-to-br from-accent/20 to-accent/5" },
  { id: 3, title: "Node.js & APIs RESTful", students: 76, modules: 8, duration: "30h", status: "published", progress: 78, image: "bg-gradient-to-br from-chart-3/20 to-chart-3/5" },
  { id: 4, title: "TypeScript Fondamentaux", students: 0, modules: 6, duration: "20h", status: "draft", progress: 30, image: "bg-gradient-to-br from-chart-4/20 to-chart-4/5" },
]

export default function TeacherCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Mes cours</h1>
          <p className="text-muted-foreground mt-1">Gerez et creez vos cours</p>
        </div>
        <Button className="gap-2" asChild>
          <Link to="/teacher/courses/new">
            <Plus className="h-4 w-4" />
            Nouveau cours
          </Link>
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un cours..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-foreground">{courses.length}</p><p className="text-sm text-muted-foreground">Total cours</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-foreground">{courses.filter(c => c.status === "published").length}</p><p className="text-sm text-muted-foreground">Publies</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-foreground">{courses.filter(c => c.status === "draft").length}</p><p className="text-sm text-muted-foreground">Brouillons</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-foreground">{courses.reduce((acc, c) => acc + c.students, 0)}</p><p className="text-sm text-muted-foreground">Total etudiants</p></CardContent></Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className={`relative h-32 ${course.image}`}>
                <Badge className={`absolute top-3 right-3 ${course.status === "published" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {course.status === "published" ? "Publie" : "Brouillon"}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1">{course.title}</h3>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.students}</div>
                  <div className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{course.modules} modules</div>
                  <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Completion moyenne</span>
                    <span className="font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
