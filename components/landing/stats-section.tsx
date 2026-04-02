"use client"

import { TrendingUp } from "lucide-react"

const stats = [
  { value: "5,000+", label: "Étudiants actifs", growth: "+25%" },
  { value: "150+", label: "Cours disponibles", growth: "+12%" },
  { value: "50+", label: "Enseignants certifiés", growth: "+8%" },
  { value: "98%", label: "Taux de satisfaction", growth: "+3%" },
]

export function StatsSection() {
  return (
    <section className="px-4 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-sidebar p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-sidebar-foreground sm:text-3xl">
              Des chiffres qui parlent
            </h2>
            <p className="mt-2 text-sidebar-foreground/60">
              Notre communauté ne cesse de grandir
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <p className="text-4xl font-bold text-sidebar-foreground lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-sidebar-foreground/60">
                  {stat.label}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                  <TrendingUp className="h-3 w-3" />
                  {stat.growth}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
