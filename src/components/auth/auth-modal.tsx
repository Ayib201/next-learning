import { useState } from "react"
import { useNavigate } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "login" | "register"
  onModeChange: (mode: "login" | "register") => void
}

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "student",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    onClose()
    
    // Redirect based on role
    if (formData.role === "teacher") {
      navigate("/teacher/dashboard")
    } else {
      navigate("/student/dashboard")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-4">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            {mode === "login" ? "Connexion" : "Creer un compte"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            {mode === "login" 
              ? "Connectez-vous pour acceder a votre espace" 
              : "Rejoignez la communaute ISI E-Learning"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Votre nom complet"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="pl-10 pr-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="role">Je suis</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectionnez votre role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Etudiant</SelectItem>
                  <SelectItem value="teacher">Enseignant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {mode === "login" && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary hover:underline">
                Mot de passe oublie?
              </button>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : mode === "login" ? (
              "Se connecter"
            ) : (
              "Creer mon compte"
            )}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Pas encore de compte?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("register")}
                  className="font-medium text-primary hover:underline"
                >
                  {"S'inscrire"}
                </button>
              </>
            ) : (
              <>
                Deja inscrit?{" "}
                <button
                  type="button"
                  onClick={() => onModeChange("login")}
                  className="font-medium text-primary hover:underline"
                >
                  Se connecter
                </button>
              </>
            )}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
