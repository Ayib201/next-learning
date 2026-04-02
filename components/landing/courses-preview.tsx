"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowRight, BookOpen } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Développement Web Full Stack",
    instructor: "Dr. Mohamed Ali",
    category: "Informatique",
    level: "Intermédiaire",
    duration: "40h",
    students: 1250,
    rating: 4.9,
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
    modules: 12,
  },
  {
    id: 2,
    title: "Base de données avancées",
    instructor: "Prof. Amina Ben",
    category: "Data Science",
    level: "Avancé",
    duration: "35h",
    students: 890,
    rating: 4.8,
    image: "bg-gradient-to-br from-accent/20 to-accent/5",
    modules: 10,
  },
  {
    id: 3,
    title: "Réseaux et Sécurité",
    instructor: "Dr. Karim Salah",
    category: "Cybersécurité",
    level: "Intermédiaire",
    duration: "30h",
    students: 675,
    rating: 4.7,
    image: "bg-gradient-to-br from-chart-3/20 to-chart-3/5",
    modules: 8,
  },
  {
    id: 4,
    title: "Intelligence Artificielle",
    instructor: "Prof. Sara Mansour",
    category: "IA & ML",
    level: "Avancé",
    duration: "50h",
    students: 1100,
    rating: 4.9,
    image: "bg-gradient-to-br from-chart-4/20 to-chart-4/5",
    modules: 15,
  },
]

export function CoursesPreview() {
  return (
    <section id="courses" className="px-4 py-20 lg:py-32 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <BookOpen className="h-4 w-4" />
              Cours populaires
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Découvrez nos cours
            </h2>
          </div>
          <Button variant="outline" className="gap-2">
            Voir tous les cours
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Courses grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20"
            >
              {/* Course image */}
              <div className={`relative h-40 ${course.image}`}>
                <Badge className="absolute top-3 left-3 bg-card/90 text-foreground">
                  {course.category}
                </Badge>
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                  {course.level}
                </Badge>
              </div>

              {/* Course content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.instructor}
                </p>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
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

                {/* Modules */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {course.modules} modules
                  </span>
                  <Button size="sm" variant="ghost" className="h-8 px-3 text-xs">
                    Voir le cours
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
