"use client"

import { ArrowRight, MessageCircle, CreditCard, Shield, MapPin, Play } from "lucide-react"
import { useUserTracking } from "../app/context/tracking-context"
import { sendMetaEvent } from "@/services/metaEventService"
import { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

export function HeroSection() {
  const { sendTrackingData } = useUserTracking()
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const [localidad, setLocalidad] = useState<string | null>(null)
  const [loadingLocalidad, setLoadingLocalidad] = useState<boolean>(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setIsVisible(true)
    const fetchLocalidad = async () => {
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json")
        const ip = ipResponse.data.ip
        const geoRes = await axios.get(`https://ipinfo.io/${ip}/json`)
        setLocalidad(geoRes.data.city)
      } catch (e: any) {
        console.warn("No se pudo obtener la localidad:", e.message)
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
      const whatsappUrl = "https://wa.me/541168568228?text=hola,%20como%20creo%20mi%20usuario%20en%20MoneyMaker"
      window.location.href = whatsappUrl
    } catch (error) {
      console.error("Error en el proceso:", error)
      const whatsappUrl = "https://wa.me/541168568228?text=hola,%20como%20creo%20mi%20usuario%20en%20MoneyMaker"
      window.location.href = whatsappUrl
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, whatsapp: false }))
    }
  }

  const CircularLoader = () => (
    <motion.div
      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-3 py-10">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Top Left: Brand Section */}
                <motion.div variants={itemVariants} className="text-center lg:text-left">
                  <motion.h1 className="text-4xl md:text-8xl font-black mb-4">
                    <motion.span
                      className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                    >
                      MONEY
                    </motion.span>
                    <motion.span
                      className="block bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["100%", "0%", "100%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                    >
                      MAKER
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-2xl text-white/70 font-light tracking-wide mb-2"
                    variants={itemVariants}
                  >
                    Sin límites. Sin excusas.
                  </motion.p>
                  <motion.p
                    className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"
                    variants={itemVariants}
                  >
                    Sólo ganás ⚡
                  </motion.p>
                </motion.div>

                {/* Top Right: Video Section */}
                <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
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
                    className="relative max-w-xs sm:max-w-sm lg:max-w-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative border-4 border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
                      <video
                        src="/outputt.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Bottom Left: Premios Card (Moved from right) */}
                <motion.div variants={itemVariants} className="flex justify-center lg:justify-start hidden lg:block">
                  <motion.div
                    className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-400/30 rounded-3xl p-6 lg:p-8 backdrop-blur-xl max-w-md lg:max-w-lg overflow-hidden"
                    whileHover={{
                      borderColor: "rgba(128, 0, 128, 0.6)",
                      backgroundColor: "rgba(128, 0, 128, 0.05)",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                      animate={{
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <div className="relative z-10">
                      <motion.h2
                        className="text-2xl lg:text-4xl font-black mb-4 text-center"
                        animate={{
                          scale: isHovered ? 1.05 : 1,
                        }}
                      >
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                          PREMIOS ALL DAY
                        </span>
                        <motion.span
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                          className="inline-block ml-2"
                        >
                          🌟
                        </motion.span>
                      </motion.h2>
                      <motion.p
                        className="text-lg lg:text-xl text-white mb-6 text-center"
                        animate={{
                          color: isHovered ? "#ff69b4" : "#ffffff",
                        }}
                      >
                        NUEVAS FUNCIONALIDADES{" "}
                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          DISPONIBLES AHORA
                        </span>
                      </motion.p>
                      {/* Process Steps */}
                      <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                        {[
                          { icon: MessageCircle, text: "Conéctate" },
                          { icon: CreditCard, text: "Cargá dinero" },
                          { icon: Play, text: "Jugá rápido" },
                        ].map((step, index) => (
                          <motion.div key={index} className="flex items-center gap-2">
                            <motion.div
                              className="flex items-center gap-2 bg-white/5 backdrop-blur-xl px-3 py-2 rounded-full border border-white/10"
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(128, 0, 128, 0.1)",
                                borderColor: "rgba(128, 0, 128, 0.3)",
                              }}
                            >
                              <step.icon className="w-4 h-4 text-purple-400" />
                              <span className="text-white font-semibold text-sm">{step.text}</span>
                            </motion.div>
                            {index < 2 && (
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <ArrowRight className="w-4 h-4 text-purple-400" />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Bottom Right: WhatsApp CTA (Moved from left) */}
                <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-end">
                  <motion.p
                    className="text-white/60 mb-6 text-base text-center lg:text-right"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    ↓ Contactanos por WhatsApp ↓
                  </motion.p>
                  <motion.button
                    onClick={handleWhatsAppClick}
                    disabled={loadingStates["whatsapp"]}
                    className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:from-green-600 disabled:to-green-700 text-black font-black py-4 px-8 text-lg lg:text-2xl rounded-2xl shadow-2xl overflow-hidden min-w-[240px] lg:min-w-[320px] min-h-[60px] lg:min-h-[80px] flex items-center justify-center gap-4 mb-6"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loadingStates["whatsapp"]}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative flex items-center gap-3">
                      {loadingStates["whatsapp"] ? (
                        <>
                          <CircularLoader />
                          <span>CONECTANDO...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8" />
                          <span>WhatsApp</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                  {/* Location with Argentina Flag */}
                  <motion.div
                    className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                    >
                      🇦🇷
                    </motion.div>
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {loadingLocalidad ? (
                      <div className="h-4 bg-white/20 rounded animate-pulse w-24" />
                    ) : (
                      <span className="text-white font-medium">{localidad || "Argentina"}</span>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
