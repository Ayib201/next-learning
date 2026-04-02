import { 
  BookOpen, 
  Video, 
  FileQuestion, 
  BarChart3, 
  Users, 
  Upload,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Gestion des cours",
    description: "Creez, organisez et gerez vos cours avec des modules, chapitres et ressources structurees.",
    color: "bg-primary/10 text-primary",
    highlights: ["Modules structures", "Chapitres organises", "Ressources illimitees"]
  },
  {
    icon: Video,
    title: "Contenus multimedia",
    description: "Integrez des videos, documents PDF, presentations et contenus interactifs.",
    color: "bg-accent/10 text-accent",
    highlights: ["Videos HD", "Documents PDF", "Contenu interactif"]
  },
  {
    icon: FileQuestion,
    title: "Quiz et evaluations",
    description: "Creez des quiz varies avec correction automatique et feedback instantane.",
    color: "bg-chart-3/10 text-chart-3",
    highlights: ["QCM automatise", "Questions ouvertes", "Feedback instantane"]
  },
  {
    icon: BarChart3,
    title: "Tableau de bord etudiant",
    description: "Suivez votre progression, vos notes et votre parcours d'apprentissage.",
    color: "bg-chart-4/10 text-chart-4",
    highlights: ["Suivi progression", "Statistiques detaillees", "Objectifs personnels"]
  },
  {
    icon: Users,
    title: "Gestion enseignants",
    description: "Outils complets pour les enseignants: creation de cours, suivi des etudiants.",
    color: "bg-chart-5/10 text-chart-5",
    highlights: ["Creation de cours", "Suivi etudiants", "Rapports detailles"]
  },
  {
    icon: Upload,
    title: "Soumission de devoirs",
    description: "Soumettez vos devoirs en ligne avec suivi des delais et notation.",
    color: "bg-destructive/10 text-destructive",
    highlights: ["Depot en ligne", "Suivi delais", "Notation integree"]
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            Fonctionnalites
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Tout ce dont vous avez besoin pour apprendre
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {"Une plateforme complete concue pour optimiser l'apprentissage et l'enseignement."}
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              <ul className="mt-4 space-y-2">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Hover effect */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Mise a jour reguliere des fonctionnalites
          </div>
          <div className="hidden sm:block h-1 w-1 rounded-full bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-accent" />
            Support 24/7
          </div>
        </div>
      </div>
    </section>
  )
}
