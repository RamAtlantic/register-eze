"use client"

import { Gift, ArrowRight, Wallet, Gamepad2, MessageCircle, CreditCard, Shield } from "lucide-react"
import { useUserTracking } from "../app/context/tracking-context"
import { sendMetaEvent } from "@/services/metaEventService"
import { useEffect, useState } from "react"
import { Loader } from "./loader"
import axios from "axios"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export function HeroSection() {
  const { sendTrackingData } = useUserTracking()
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [localidad, setLocalidad] = useState<string | null>(null)
  const [loadingLocalidad, setLoadingLocalidad] = useState<boolean>(true)
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fetchLocalidad = async () => {
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json')
        const ip = ipResponse.data.ip
        const geoRes = await axios.get(`http://ip-api.com/json/${ip}`)
        setLocalidad(geoRes.data.city)
      } catch (e: any) {
        console.warn('No se pudo obtener la localidad:', e.message)
      } finally {
        setLoadingLocalidad(false)
      }
    }
    fetchLocalidad()
  }, [])

  const handleWhatsAppClick = async () => {
    setLoadingStates((prevStates) => ({ ...prevStates, whatsapp: true }))

    try {
      const tempEmail = `user_${Date.now()}@example.com`
      const success = await sendMetaEvent(tempEmail, "10")

      if (success) {
        console.log("Evento de registro enviado exitosamente a Meta")
      } else {
        console.warn("No se pudo enviar el evento a Meta")
      }

      try {
        await sendTrackingData()
        console.log("Datos de tracking enviados exitosamente")
      } catch (error) {
        console.warn("Error enviando datos de tracking:", error)
      }

      // Redirección a WhatsApp
      const whatsappUrl =
        process.env.NEXT_PUBLIC_WHATSAPP_URL ||
        "https://wa.me/541168568228?text=hola,%20como%20creo%20mi%20usuario%20en%20MoneyMaker"
      window.open(whatsappUrl, "_blank")
    } catch (error) {
      console.error("Error en el proceso:", error)
      // Fallback a WhatsApp directo
      const whatsappUrl =
        process.env.NEXT_PUBLIC_WHATSAPP_URL ||
        "https://wa.me/1234567890?text=Hola,%20quiero%20registrarme%20en%20Mooney%20Maker"
      window.open(whatsappUrl, "_blank")
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, whatsapp: false }))
    }
  }

  const CircularLoader = () => (
    <div className="loader-circle border-t-4 border-b-4 border-yellow-400 rounded-full w-8 h-8 animate-spin"></div>
  )

  return (
    <section className="min-h-screen bg-black flex items-center justify-center flex-col px-4 lg:px-0 pt-20 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">

        {/* Main Heading */}
        <div className="mb-8 lg:mb-12 lg:mt-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 font-chango">Duplicá Con MOONEY MAKER <br />⚡</h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Sin límites. Sin excusas
            <br />Sólo ganás...
          </p>
          
        </div>

        {/* Logo/Brand Section */}
        <div className="flex justify-center items-center h-full">
                <motion.div
                  initial={isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8, x: 200 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 1,
                    delay: isMobile ? 0.3 : 0.5,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  className="object-contain max-h-[100vh] max-w-xl mx-auto rounded-2xl shadow-2xl w-full flex justify-center items-center relative px-5"
                >
                  <video
                    src="/video.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-2xl shadow-2xl object-contain"
                  />
                  {/* Overlay difuminado */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(0,0,0,0) 25%, rgba(0,0,0,0.8) 60%, #000 100%)"
                    }}
                  />
                </motion.div>
              </div>

                {/* CTA Section */}
        <div className="mb-8 lg:mb-12">


          <button
            onClick={handleWhatsAppClick}
            disabled={loadingStates["whatsapp"]}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed text-black font-bold py-4 lg:py-5 px-8 lg:px-12 text-xl lg:text-2xl rounded-full border-4 border-green-400 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 font-chango tracking-wider shadow-2xl flex items-center justify-center gap-3 mx-auto min-w-[280px] lg:min-w-[320px] min-h-[70px] lg:min-h-[80px]"
          >
            {loadingStates["whatsapp"] ? (
              <div className="flex items-center gap-3">
                <CircularLoader />
                <span>CONECTANDO...</span>
              </div>
            ) : (
              <>
                <MessageCircle className="w-7 lg:w-8 h-7 lg:h-8" />
                WhatsApp
              </>
            )}
          </button>
        </div>



              {/* Mostrar la localidad o Skeleton */}
        <div className="mb-8 lg:mb-12">
          {loadingLocalidad ? (
            <div className="h-6 bg-gray-300 rounded animate-pulse w-48 mx-auto"></div>
          ) : (
            <p className="text-yellow-400 text-lg lg:text-xl mb-6 font-semibold">
              175 usuarios registrados las últimas 24 hs en {localidad || 'tu área'}
            </p>
          )}
        </div>

        

        {/* Bonus Offer */}
        <div className="mb-8 lg:mb-12">
          <div 
            className={`bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-400/30 rounded-2xl p-6 lg:p-8 backdrop-blur-sm transition-all duration-300 ${isHovered ? 'from-green-500 to-yellow-500 border-green-400' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h2 className={`text-2xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-4 font-chango ${isHovered ? 'text-white' : ''}`}>
              🔥 Bon0 del 100% en tu primera carga 🔥
            </h2>
            <p className={`text-white text-lg lg:text-xl mb-6 ${isHovered ? 'text-yellow-400' : ''}`}>
              <span className={`font-bold ${isHovered ? 'text-yellow-400' : ''}`}>REGISTRESE</span> - DEPÓSITO DE HASTA{" "}
              <span className={`font-bold text-green-400 ${isHovered ? 'text-yellow-400' : ''}`}>$10.000 FICHA LIBRE</span>
            </p>

            {/* Process Steps */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Gift className="w-5 lg:w-6 h-5 lg:h-6 text-green-400" />
                <span className="text-sm lg:text-base text-white font-semibold">Registro</span>
              </div>
              <ArrowRight className="w-4 h-4 text-green-400" />
              <div className="flex items-center gap-2">
                <Wallet className="w-5 lg:w-6 h-5 lg:h-6 text-green-400" />
                <span className="text-sm lg:text-base text-white font-semibold">Deposite</span>
              </div>
              <ArrowRight className="w-4 h-4 text-green-400" />
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 lg:w-6 h-5 lg:h-6 text-green-400" />
                <span className="text-sm lg:text-base text-white font-semibold">Juga</span>
              </div>
            </div>
          </div>
        </div>

        

      

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
            <CreditCard className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-yellow-400 font-bold text-sm lg:text-base mb-2 font-chango">Recargas inmediatas</h3>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
            <Wallet className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-yellow-400 font-bold text-sm lg:text-base mb-2 font-chango">Pagos sin restricciones</h3>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
            <Gamepad2 className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-yellow-400 font-bold text-sm lg:text-base mb-2 font-chango">Juegos sin límites</h3>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-yellow-400 font-bold text-sm lg:text-base mb-2 font-chango">Seguridad garantizada</h3>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-black pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  )
}
