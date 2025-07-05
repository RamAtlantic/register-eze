"use client"

import { useUserTracking } from "@/app/context/tracking-context"
import { useEffect, useRef, useState } from "react"

interface IframeMessage {
  type: string
  data?: any
}

export function IframeContainer() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const { sendTrackingData } = useUserTracking()

  useEffect(() => {
    const handleMessage = (event: MessageEvent<IframeMessage>) => {
      // Verificar origen por seguridad (ajusta según tu dominio)
      // if (event.origin !== "https://tu-dominio.com") return

      const { type, data } = event.data

      switch (type) {
        case "IFRAME_LOADED":
          console.log("Iframe cargado correctamente")
          setIsIframeLoaded(true)
          // Enviar configuración inicial al iframe
          sendMessageToIframe({
            type: "INIT_CONFIG",
            data: {
              theme: "dark",
              tracking: true,
            },
          })
          break

        case "BUTTON_CLICKED":
          console.log("Botón clickeado en iframe:", data)
          handleButtonClick(data)
          break

        case "TRACKING_EVENT":
          console.log("Evento de tracking desde iframe:", data)
          handleTrackingEvent(data)
          break

        case "PAGE_VIEW":
          console.log("Page view desde iframe:", data)
          handlePageView(data)
          break

        default:
          console.log("Mensaje no reconocido:", type, data)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const sendMessageToIframe = (message: IframeMessage) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, "*")
    }
  }

  const handleButtonClick = (data: any) => {
    // Lógica de tracking para el botón

    

    console.log("Tracking button click:", data)
  }

  const handleTrackingEvent = (data: any) => {
    // Manejar eventos de tracking personalizados

  }

  const handlePageView = (data: any) => {
    // Manejar page views del iframe

  }

  const handleIframeLoad = () => {
    console.log("Iframe DOM loaded")
    // El iframe enviará un mensaje cuando esté completamente cargado
  }

  return (
    <div className="fixed inset-0 w-full h-full">
      <iframe
        ref={iframeRef}
        src="https://honeydew-okapi-291699.hostingersite.com/"
        className="w-full h-full border-0"
        onLoad={handleIframeLoad}
        title="MooneyMaker Content"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />

      {/* Overlay de loading mientras el iframe carga */}
      {!isIframeLoaded && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-xl">Cargando contenido...</div>
        </div>
      )}
    </div>
  )
}
