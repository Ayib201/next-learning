"use client"

import { useState } from "react"
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { StatsSection } from "@/components/landing/stats-section"
import { CoursesPreview } from "@/components/landing/courses-preview"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { AuthModal } from "@/components/auth/auth-modal"

export default function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const openLogin = () => {
    setAuthMode("login")
    setAuthModalOpen(true)
  }

  const openRegister = () => {
    setAuthMode("register")
    setAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogin={openLogin} onRegister={openRegister} />
      <main>
        <HeroSection onGetStarted={openRegister} />
        <FeaturesSection />
        <StatsSection />
        <CoursesPreview />
        <TestimonialsSection />
        <CTASection onGetStarted={openRegister} />
      </main>
      <Footer />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}
