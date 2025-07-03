"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useUserTracking } from "../app/context/tracking-context"
import { sendMetaEvent } from "@/services/metaEventService"
import { Loader } from "./ui/loader"
import { CasinoHoverVideo } from "./casinoHoverVideo"
import { RuletaHoverVideo } from "./ruleta-hover-video"

export function ContentSectionUpdated() {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})
  const { sendTrackingData } = useUserTracking()
  const [isRuletaVideoVisible, setIsRuletaVideoVisible] = useState(false)

  const handleRegistration = async () => {
    setLoadingStates((prevStates) => ({ ...prevStates, button1: true }))

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

      const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL
      if (registerUrl) {
        window.location.href = registerUrl
      }
    } catch (error) {
      console.error("Error en el proceso de registro:", error)
      const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL
      if (registerUrl) {
        window.location.href = registerUrl
      }
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, button1: false }))
    }
  }

  const handleButtonClick = async (buttonId: string) => {
    setLoadingStates((prevStates) => ({ ...prevStates, [buttonId]: true }))
    try {
      await handleRegistration()
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, [buttonId]: false }))
    }
  }

  const handleRuletaMouseEnter = () => {
    setIsRuletaVideoVisible(true)
    setTimeout(() => {
      setIsRuletaVideoVisible(false)
    }, 5000)
  }

  return (
    <div className="bg-black py-12">
      <section className="container mx-auto px-3 lg:px-0">
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-2">
          {/* Casino Card with Hover Video */}
          <CasinoHoverVideo onRegistration={handleRegistration} isLoading={loadingStates["button1"]}>
            <div className="text-left">
              <h3 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-2 lg:mb-3 font-chango">
                Casino
              </h3>
              <p className="text-sm lg:text-base text-white mb-2 lg:mb-4">
                Disfrute de nuestra exclusiva selección de tragamonedas, y juegos originales GANÁ Y RETIRA EN EL ACTO.
              </p>
              {loadingStates["button1"] ? (
                <Loader />
              ) : (
                <button
                  onClick={() => handleButtonClick("button1")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 lg:py-3 px-4 lg:px-6 rounded-r-full rounded-l-none border-2 border-green-400 transition-colors duration-200 font-chango"
                >
                  IR A CASINO
                </button>
              )}
            </div>
          </CasinoHoverVideo>

          {/* Deportes Card */}
          <div className="bg-black rounded-lg p-4 border border-gray-700 group hover:border-yellow-500 hover:shadow-lg transition-all duration-500 ease-in-out">
            <div className="grid grid-cols-1 gap-4 items-center lg:grid-cols-2">
              <div className="text-left">
                <h3 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-2 lg:mb-3 font-chango">
                  Deportes
                </h3>
                <p className="text-sm lg:text-base text-white mb-2 lg:mb-4">
                  Nuestra casa de apuestas intuitiva está hecha tanto para jugadores nuevos como experimentados.
                </p>
                {loadingStates["button2"] ? (
                  <Loader />
                ) : (
                  <button
                    onClick={() => handleButtonClick("button2")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 lg:py-3 px-4 lg:px-6 rounded-r-full rounded-l-none border-2 border-green-400 transition-colors duration-200 font-chango"
                  >
                    IR A DEPORTES
                  </button>
                )}
              </div>
              <div className="flex justify-center relative">
                <img
                  src="https://nic5.mooneymaker.io/img/deportes.webp"
                  className="w-full max-w-xs transition-opacity duration-300 group-hover:opacity-0"
                  alt="Deportes"
                />
                <img
                  src="/hover1.jpg"
                  className="w-full max-w-xs absolute top-0 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  alt="Messi Casino"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-2">
          {/* Ruleta Card with Hover Video */}
          <RuletaHoverVideo onButtonClick={() => handleButtonClick("button3")} isLoading={loadingStates["button3"]}>
            <div className="text-left" onMouseEnter={handleRuletaMouseEnter}>
             
              <h3 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-2 lg:mb-3 font-chango">
                Ruleta en Vivo
              </h3>
              <p className="text-sm lg:text-base text-white mb-2 lg:mb-4">
                Junto a expertos en el acierto te esperan las mejores ruletas en vivo para que puedas disfrutarlo al
                máximo.
              </p>
              {loadingStates["button3"] ? (
                <Loader />
              ) : (
                <button
                  onClick={() => handleButtonClick("button3")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 lg:py-3 px-4 lg:px-6 rounded-r-full rounded-l-none border-2 border-green-400 transition-colors duration-200 font-chango"
                >
                  JUGAR EN VIVO
                </button>
              )}
            </div>
          </RuletaHoverVideo>

          {/* Enhanced Create User Card with Crystal Glass Effect */}
          <motion.div
            className="hidden md:flex bg-black rounded-lg p-4 border border-gray-700 items-center justify-center flex-col relative overflow-hidden cursor-pointer group hover:border-yellow-500 hover:shadow-lg transition-all duration-500 ease-in-out"
            onClick={handleRegistration}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated Tech Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="tech-grid"></div>
              <div className="tech-lines"></div>
            </div>

            {/* Crystal Glass Reflection Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 w-1/3"
              initial={{ x: "-100%" }}
              whileHover={{ x: "300%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/20 via-yellow-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

            {/* Content */}
            <div className="relative z-10">
              {loadingStates["button1"] ? (
                <Loader />
              ) : (
                <motion.h3
                  className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-3 lg:mb-4 font-chango text-center"
                  whileHover={{
                    textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  CREA TU USUARIO
                </motion.h3>
              )}

              <motion.p
                className="text-xl lg:text-2xl text-white leading-tight text-center group-hover:text-green-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Y RECIBA RECOMPENSAS DE DEPÓSITO DE HASTA{" "}
                <motion.span
                  className="font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent"
                  whileHover={{
                    textShadow: "0 0 15px rgba(250, 204, 21, 0.5)",
                    scale: 1.1,
                  }}
                >
                  $10.000.000
                </motion.span>
              </motion.p>
            </div>

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .tech-grid {
          background-image: 
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: moveGrid 20s linear infinite;
        }

        .tech-lines {
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(34, 197, 94, 0.1) 50%,
            transparent 70%
          );
          animation: moveDiagonal 15s linear infinite;
        }

        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes moveDiagonal {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }

        .group:hover .tech-grid {
          animation-duration: 10s;
        }

        .group:hover .tech-lines {
          animation-duration: 8s;
        }
      `}</style>
    </div>
  )
}
