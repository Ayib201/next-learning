"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { User, Save, Camera, GraduationCap } from "lucide-react"

export default function TeacherSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Dr. Mohamed Ali",
    email: "mohamed.ali@isi.tn",
    phone: "+216 98 123 456",
    department: "Informatique",
    title: "Maître de conférences",
    bio: "Docteur en informatique, spécialisé en développement web et technologies modernes. Plus de 10 ans d'expérience dans l'enseignement supérieur.",
  })

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Gérez votre profil enseignant
        </p>
      </div>

      {/* Profile photo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Photo de profil
          </CardTitle>
          <CardDescription>
            Votre photo sera visible par les étudiants
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              MA
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" className="gap-2">
              <Camera className="h-4 w-4" />
              Changer la photo
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG ou GIF. Taille max 2MB.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Informations professionnelles
          </CardTitle>
          <CardDescription>
            Ces informations seront affichées sur votre profil public
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Titre académique</Label>
              <Input
                id="title"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="department">Département</Label>
              <Input
                id="department"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biographie</Label>
            <Textarea
              id="bio"
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Décrivez votre parcours et vos spécialités..."
            />
            <p className="text-xs text-muted-foreground">
              Cette description apparaîtra sur vos pages de cours
            </p>
          </div>

          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Enregistrer les modifications
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
