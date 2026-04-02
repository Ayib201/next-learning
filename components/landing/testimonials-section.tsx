"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Yasmine Benali",
    role: "Étudiante en Informatique",
    avatar: "YB",
    content: "Cette plateforme a transformé ma façon d'apprendre. Les cours sont bien structurés et les quiz m'aident à valider mes connaissances.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ahmed Khelifi",
    role: "Étudiant en Génie Logiciel",
    avatar: "AK",
    content: "Le suivi de progression est excellent. Je peux voir exactement où j'en suis et ce qu'il me reste à apprendre.",
    rating: 5,
  },
  {
    id: 3,
    name: "Prof. Fatima Zohra",
    role: "Enseignante",
    avatar: "FZ",
    content: "En tant qu'enseignante, j'apprécie la facilité de création de cours et le suivi détaillé de mes étudiants.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-4 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-chart-5/10 px-4 py-1.5 text-sm font-medium text-chart-5">
            <Star className="h-4 w-4 fill-chart-5" />
            Témoignages
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ce que disent nos utilisateurs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Découvrez les retours de notre communauté
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
              
              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-chart-5 text-chart-5" />
                ))}
              </div>

              {/* Content */}
              <p className="mt-4 text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
