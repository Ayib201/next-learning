"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

interface CTASectionProps {
  onGetStarted: () => void
}

const benefits = [
  "Accès illimité à tous les cours",
  "Certificats reconnus",
  "Support personnalisé",
  "Communauté active",
]

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="px-4 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-sidebar p-8 lg:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-sidebar-foreground sm:text-4xl text-balance">
                Prêt à commencer votre parcours d&apos;apprentissage?
              </h2>
              <p className="mt-4 text-lg text-sidebar-foreground/70 text-pretty">
                Rejoignez des milliers d&apos;étudiants qui ont déjà transformé leur carrière grâce à ISI E-Learning.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sidebar-foreground/80">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <div className="text-center lg:text-right">
                <p className="text-sm text-sidebar-foreground/60">Commencez gratuitement</p>
                <p className="mt-1 text-4xl font-bold text-sidebar-foreground">
                  0 DT <span className="text-lg font-normal text-sidebar-foreground/60">/ mois</span>
                </p>
                <p className="mt-1 text-sm text-sidebar-foreground/60">
                  Puis à partir de 49 DT/mois
                </p>
              </div>
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="mt-6 gap-2 bg-primary hover:bg-primary/90"
              >
                Créer mon compte gratuit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
