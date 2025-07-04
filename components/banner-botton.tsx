import { useUserTracking } from "@/app/context/tracking-context"
import { sendMetaEvent } from "@/services/metaEventService"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useState } from "react"

export function BannerBottom() {
  const [loadingStates, setLoadingStates] = useState({
    whatsapp: false,
  })

  const { sendTrackingData } = useUserTracking()

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
    return (
      <div className="w-full bg-transparent border-2 border-grey-500 py-6 flex flex-col items-center justify-center">
        <span className="text-black text-2xl md:text-3xl font-chango text-center">
          ¡Aprovecha las mejores promociones y bonos exclusivos!
        </span>
        <motion.button
                    onClick={handleWhatsAppClick}
                    disabled={loadingStates["whatsapp"]}
                    className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:from-green-600 disabled:to-green-700 text-black font-black py-6 px-12 text-2xl rounded-2xl shadow-2xl overflow-hidden min-w-[320px] min-h-[80px] flex items-center justify-center gap-4"
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
                          <MessageCircle className="w-8 h-8" />
                          <span>WhatsApp</span>
                        </>
                      )}
                    </div>
                  </motion.button>
      </div>
    )
  }