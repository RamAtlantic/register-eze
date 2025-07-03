"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ContentSectionUpdated } from "@/components/content-section"
import { Loader } from "@/components/loader"
import { BannerBottom } from "@/components/banner-botton"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className={`${loading ? "hidden" : "block"}`}>
        <Navbar />
        <HeroSection />
        <BannerBottom />
      </div>
    </>
  )
}
