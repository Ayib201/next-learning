"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, Bell, Shield, Palette, Save, Camera } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Ahmed Salah",
    email: "ahmed.salah@isi.tn",
    phone: "+216 98 765 432",
    field: "Informatique",
    level: "Licence 3",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    assignments: true,
    grades: true,
    announcements: false,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Gérez votre compte et vos préférences
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Apparence</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Photo de profil</CardTitle>
              <CardDescription>
                Votre photo sera visible par les enseignants et autres étudiants
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  AS
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

          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations de profil
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
                <div className="space-y-2">
                  <Label htmlFor="field">Filière</Label>
                  <Select value={profile.field} onValueChange={(value) => setProfile({ ...profile, field: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Informatique">Informatique</SelectItem>
                      <SelectItem value="Génie Logiciel">Génie Logiciel</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Cybersécurité">Cybersécurité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Notifications par email</p>
                  <p className="text-sm text-muted-foreground">Recevoir des emails pour les mises à jour importantes</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Notifications push</p>
                  <p className="text-sm text-muted-foreground">Notifications dans le navigateur</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Rappels de devoirs</p>
                  <p className="text-sm text-muted-foreground">Être notifié avant les dates limites</p>
                </div>
                <Switch
                  checked={notifications.assignments}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, assignments: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Nouvelles notes</p>
                  <p className="text-sm text-muted-foreground">Être notifié quand une note est publiée</p>
                </div>
                <Switch
                  checked={notifications.grades}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, grades: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Annonces générales</p>
                  <p className="text-sm text-muted-foreground">Recevoir les annonces de la plateforme</p>
                </div>
                <Switch
                  checked={notifications.announcements}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, announcements: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Changer le mot de passe</CardTitle>
              <CardDescription>
                Assurez-vous d&apos;utiliser un mot de passe fort
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Mettre à jour le mot de passe</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sessions actives</CardTitle>
              <CardDescription>
                Gérez vos sessions de connexion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">Chrome - Windows</p>
                    <p className="text-sm text-muted-foreground">Session actuelle - Tunis, Tunisie</p>
                  </div>
                  <span className="text-xs text-accent">Actif maintenant</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">Safari - iPhone</p>
                    <p className="text-sm text-muted-foreground">Dernière activité il y a 2 heures</p>
                  </div>
                  <Button variant="outline" size="sm">Déconnecter</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Thème</CardTitle>
              <CardDescription>
                Personnalisez l&apos;apparence de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary p-4">
                  <div className="h-20 w-full rounded bg-background border border-border" />
                  <span className="text-sm font-medium">Clair</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-border p-4 hover:border-primary transition-colors">
                  <div className="h-20 w-full rounded bg-sidebar" />
                  <span className="text-sm font-medium">Sombre</span>
                </button>
                <button className="flex flex-col items-center gap-2 rounded-lg border-2 border-border p-4 hover:border-primary transition-colors">
                  <div className="h-20 w-full rounded bg-gradient-to-b from-background to-sidebar" />
                  <span className="text-sm font-medium">Système</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
