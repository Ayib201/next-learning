import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, TrendingUp } from "lucide-react"

const students = [
  { id: 1, name: "Yasmine Benali", email: "yasmine@isi.tn", avatar: "YB", courses: 3, progress: 78, status: "active" },
  { id: 2, name: "Ahmed Khelifi", email: "ahmed@isi.tn", avatar: "AK", courses: 2, progress: 65, status: "active" },
  { id: 3, name: "Sara Mansour", email: "sara@isi.tn", avatar: "SM", courses: 3, progress: 92, status: "active" },
  { id: 4, name: "Mohamed Ali", email: "mohamed@isi.tn", avatar: "MA", courses: 1, progress: 45, status: "inactive" },
]

export default function TeacherStudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Etudiants</h1>
        <p className="text-muted-foreground mt-1">Gerez et suivez vos etudiants</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"><Users className="h-6 w-6 text-primary" /></div><div><p className="text-2xl font-bold text-foreground">{students.length}</p><p className="text-sm text-muted-foreground">Total etudiants</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10"><TrendingUp className="h-6 w-6 text-accent" /></div><div><p className="text-2xl font-bold text-foreground">{students.filter(s => s.status === "active").length}</p><p className="text-sm text-muted-foreground">Actifs</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/10"><TrendingUp className="h-6 w-6 text-chart-3" /></div><div><p className="text-2xl font-bold text-foreground">{Math.round(students.reduce((a, s) => a + s.progress, 0) / students.length)}%</p><p className="text-sm text-muted-foreground">Progression moyenne</p></div></CardContent></Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher un etudiant..." className="pl-9" />
      </div>

      <Card>
        <CardHeader><CardTitle>Liste des etudiants</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {students.map((student) => (
            <div key={student.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
              <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary">{student.avatar}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{student.name}</p>
                <p className="text-sm text-muted-foreground">{student.email}</p>
              </div>
              <div className="text-center"><p className="font-medium text-foreground">{student.courses}</p><p className="text-xs text-muted-foreground">cours</p></div>
              <div className="text-center"><p className="font-medium text-foreground">{student.progress}%</p><p className="text-xs text-muted-foreground">progression</p></div>
              <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status === "active" ? "Actif" : "Inactif"}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
