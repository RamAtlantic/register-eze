"use client";

import { UserPlus, UploadCloud, MessageCircle } from "lucide-react";
import { useUserTracking } from "../app/context/tracking-context";
import { sendMetaEvent } from "@/services/metaEventService";
import { useState } from "react";
import { Loader } from "./ui/loader";
import { useIsMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const { sendTrackingData } = useUserTracking();

  const handleButtonClick = async (buttonId: string, isWhatsApp = false) => {
    setLoadingStates((prevStates) => ({ ...prevStates, [buttonId]: true }));

    try {
      const tempEmail = `user_${Date.now()}@example.com`;
      const success = await sendMetaEvent(tempEmail, "10");

      if (success) {
        console.log("Evento enviado exitosamente a Meta");
      } else {
        console.warn("No se pudo enviar el evento a Meta");
      }

      try {
        await sendTrackingData();
        console.log("Datos de tracking enviados exitosamente");
      } catch (error) {
        console.warn("Error enviando datos de tracking:", error);
      }

      if (isWhatsApp) {
        // Redirección a WhatsApp
        const whatsappUrl =
          process.env.NEXT_PUBLIC_WHATSAPP_URL ||
          "https://wa.me/1234567890?text=Hola,%20quiero%20registrarme%20en%20Mooney%20Maker";
        window.open(whatsappUrl, "_blank");
      } else {
        // Redirección normal
        const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL;
        if (registerUrl) {
          window.location.href = registerUrl;
        }
      }
    } catch (error) {
      console.error("Error en el proceso:", error);

      if (isWhatsApp) {
        const whatsappUrl =
          process.env.NEXT_PUBLIC_WHATSAPP_URL ||
          "https://wa.me/1234567890?text=Hola,%20quiero%20registrarme%20en%20Mooney%20Maker";
        window.open(whatsappUrl, "_blank");
      } else {
        const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL;
        if (registerUrl) {
          window.location.href = registerUrl;
        }
      }
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, [buttonId]: false }));
    }
  };

  const isMobile = useIsMobile()

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-green-400/20">
      <div className={`container mx-auto px-4 md:px-6 py-3 md:py-4 ${isMobile ? 'flex justify-center' : ''}`}>
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <a href="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
              <img
                src="https://mooneymaker.co/frontend/CSOFTV7/img/logo%20mooney.png"
                alt="Mooney Maker"
                width="100"
                height="40"
                className="h-10 md:h-12 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          {/* Mostrar solo en escritorio */}
          {!isMobile && (
            <div className="flex items-center gap-2 md:gap-4">
              {/* WhatsApp Button */}
              <button
                onClick={() => handleButtonClick("whatsapp", true)}
                disabled={loadingStates["whatsapp"]}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed text-black font-bold text-sm md:text-lg py-2 md:py-3 px-3 md:px-6 rounded-full border-2 border-green-400 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 font-chango tracking-wide shadow-lg hover:shadow-green-500/25 flex items-center gap-1 md:gap-2 min-h-[44px] md:min-h-[52px]"
              >
                {loadingStates["whatsapp"] ? (
                  <div className="flex items-center gap-1 md:gap-2">
                    <Loader />
                    <span className="hidden sm:inline">CONECTANDO...</span>
                  </div>
                ) : (
                  <>
                    <MessageCircle className="w-4 md:w-5 h-4 md:h-5" />
                    <span className="hidden sm:inline">WHATSAPP</span>
                    <span className="sm:hidden">WSP</span>
                  </>
                )}
              </button>

              {/* Register Button */}
              <button
                onClick={() => handleButtonClick("register")}
                disabled={loadingStates["register"]}
                className="bg-gray-900/80 hover:bg-gradient-to-r hover:from-green-500/20 hover:to-yellow-500/20 disabled:bg-gray-800/60 disabled:cursor-not-allowed text-white font-bold text-sm md:text-lg py-2 md:py-3 px-3 md:px-6 rounded-full border-2 border-green-400/50 hover:border-green-400 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 font-chango tracking-wide backdrop-blur-sm shadow-lg hover:shadow-green-500/10 flex items-center gap-1 md:gap-2 min-h-[44px] md:min-h-[52px]"
              >
                {loadingStates["register"] ? (
                  <div className="flex items-center gap-1 md:gap-2">
                    <Loader />
                    <span className="hidden sm:inline">CARGANDO...</span>
                  </div>
                ) : (
                  <>
                    <UserPlus className="w-4 md:w-5 h-4 md:h-5" />
                    <span className="hidden sm:inline">REGISTRO</span>
                    <span className="sm:hidden">REG</span>
                  </>
                )}
              </button>

              {/* Upload/Deposit Button */}
              <button
                onClick={() => handleButtonClick("upload")}
                disabled={loadingStates["upload"]}
                className="bg-gray-900/80 hover:bg-gradient-to-r hover:from-green-500/20 hover:to-yellow-500/20 disabled:bg-gray-800/60 disabled:cursor-not-allowed text-white font-bold text-sm md:text-lg py-2 md:py-3 px-3 md:px-6 rounded-full border-2 border-green-400/50 hover:border-green-400 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 font-chango tracking-wide backdrop-blur-sm shadow-lg hover:shadow-green-500/10 flex items-center gap-1 md:gap-2 min-h-[44px] md:min-h-[52px]"
              >
                {loadingStates["upload"] ? (
                  <div className="flex items-center gap-1 md:gap-2">
                    <Loader />
                    <span className="hidden sm:inline">CARGANDO...</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-4 md:w-5 h-4 md:h-5" />
                    <span className="hidden sm:inline">DEPOSITO</span>
                    <span className="sm:hidden">DEP</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
    </nav>
  );
}
