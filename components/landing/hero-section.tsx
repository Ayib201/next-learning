"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, BookOpen, Users, Award } from "lucide-react"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
              Nouvelle session disponible
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Apprenez sans limites avec{" "}
              <span className="text-primary">ISI E-Learning</span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Accédez à des cours de qualité, des quiz interactifs et un suivi personnalisé 
              de votre progression. Rejoignez notre communauté d&apos;apprenants et d&apos;enseignants.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" onClick={onGetStarted} className="gap-2">
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-4 w-4" />
                Voir la démo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center justify-center gap-8 lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">150+</p>
                  <p className="text-xs text-muted-foreground">Cours</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">5K+</p>
                  <p className="text-xs text-muted-foreground">Étudiants</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                  <Award className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">98%</p>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Dashboard Preview */}
          <div className="relative">
            <div className="relative rounded-2xl border border-border bg-card p-2 shadow-2xl">
              <div className="rounded-xl bg-sidebar p-4">
                {/* Mini dashboard preview */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20" />
                      <div>
                        <p className="text-sm font-medium text-sidebar-foreground">Bienvenue, Ahmed</p>
                        <p className="text-xs text-sidebar-foreground/60">Niveau: Avancé</p>
                      </div>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">4.8/5</Badge>
                  </div>

                  {/* Progress cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-sidebar-accent p-3">
                      <p className="text-xs text-sidebar-foreground/60">Progression</p>
                      <p className="text-lg font-bold text-sidebar-foreground">78%</p>
                      <div className="mt-2 h-1.5 rounded-full bg-sidebar-border">
                        <div className="h-full w-3/4 rounded-full bg-primary" />
                      </div>
                    </div>
                    <div className="rounded-lg bg-sidebar-accent p-3">
                      <p className="text-xs text-sidebar-foreground/60">Cours actifs</p>
                      <p className="text-lg font-bold text-sidebar-foreground">6</p>
                      <p className="mt-1 text-xs text-accent">+2 cette semaine</p>
                    </div>
                  </div>

                  {/* Course list preview */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-sidebar-foreground/60">Cours en cours</p>
                    {["Développement Web", "Base de données", "Réseaux"].map((course, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-2">
                        <div className={`h-8 w-8 rounded-lg ${i === 0 ? 'bg-primary/20' : i === 1 ? 'bg-accent/20' : 'bg-chart-3/20'}`} />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-sidebar-foreground">{course}</p>
                          <div className="mt-1 h-1 rounded-full bg-sidebar-border">
                            <div 
                              className={`h-full rounded-full ${i === 0 ? 'bg-primary w-4/5' : i === 1 ? 'bg-accent w-1/2' : 'bg-chart-3 w-1/3'}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -right-4 -top-4 rounded-xl border border-border bg-card p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
                  <Award className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">Certificat obtenu!</p>
                  <p className="text-xs text-muted-foreground">React Avancé</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-6 rounded-full border-2 border-card bg-primary/20" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">+127 en ligne</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
