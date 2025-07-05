"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Phone,
  ArrowRight,
  User,
  CreditCard,
  DollarSign,
  Upload,
  Clock,
  AlertTriangle,
  User2,
  MapPin,
} from "lucide-react"
import { useState, useEffect } from "react"
import axios from 'axios';
import { motion } from 'framer-motion';
import { sendMetaEvent } from "@/services/metaEventService"
import { useUserTracking } from "./context/tracking-context"

export default function HomePage() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [localidad, setLocalidad] = useState('');
  const [loadingLocalidad, setLoadingLocalidad] = useState(true);
  const [loadingStates, setLoadingStates] = useState({
    whatsapp: false,
  })
  const {sendTrackingData} = useUserTracking()

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSteps((prev) => {
        if (prev.length < 5) {
          return [...prev, prev.length]
        }
        return prev
      })
    }, 800)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchLocalidad = async () => {
      try {
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ip = ipResponse.data.ip;
        const geoRes = await axios.get(`https://ipinfo.io/${ip}/json`);
        setLocalidad(geoRes.data.city);
      } catch (e: any) {
        console.warn('No se pudo obtener la localidad:', e.message);
      } finally {
        setLoadingLocalidad(false);
      }
    };
    fetchLocalidad();
  }, []);

  const steps = [
    {
      id: 1,
      title: "PASO 1: REGISTRARTE",
      description: "ARRIBA A LA DERECHA HAZ CLICK EN",
      highlight: "REGISTRARTE",
      icon: User,
      color: "yellow",
      image: "https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/2-AQEJWB6qQNT5WyMr.png",
    },
    {
      id: 2,
      title: "PASO 2: ACCEDER A DEPÓSITO",
      description: "HAZ CLICK EN TU",
      highlight: "NOMBRE DE USUARIO",
      description2: "Y LUEGO",
      highlight2: "EN DEPOSITAR",
      icon: CreditCard,
      color: "yellow",
      image: "https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/3-YleMbGNzPMt47PBy.png",
    },
    {
      id: 3,
      title: "PASO 3: ELEGIR MONTO",
      description: "ELIGE EL MONTO",
      highlight: "(MÍNIMO 1000)",
      description2: "Y HAZ CLICK EN TRANSFERENCIA BANCARIA",
      icon: DollarSign,
      color: "yellow",
      image: "https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/4-ALpJWMLqBzTjK04R.png",
    },
    {
      id: 4,
      title: "PASO 4: ENVIAR COMPROBANTE",
      description: "ENVÍA EL DINERO AL CBU Y LUEGO SUBE EL COMPROBANTE",
      icon: Upload,
      color: "yellow",
      image: "IMAGEN PASO 4",
    },
    {
      id: 5,
      title: "PASO 5: ESPERAR",
      description: "SOLO ESPERA UNOS MINUTOS Y TENDRÁS TUS FICHAS",
      icon: Clock,
      color: "green",
      image: null,
    },
  ]

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
    <div className="bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative lg:max-h-[100vh] h-screen bg-[url('https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/10081437-A85pwoqkDpi7B969.jpg')] bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10  mx-auto px-4 py-4 lg:py-16">
          <div className="text-center mb-4 lg:mb-8">
            <div className="mb-3 lg:mb-6 mx-auto max-w-[80px] lg:max-w-[100px]">
              <img
                src="https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/logo-mP4Owpv3P8uxzoxb.webp"
                alt=""
                srcSet=""
              />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 lg:mb-4">¡Bienvenido/a!</h1>
            <p className="text-sm md:text-2xl text-white/70 mb-4 lg:mb-8">
              Crea tu usuario vos mismo o lo creamos nosotros
            </p>
            <div className="bg-gradient-to-r from-transparent via-yellow-400 to-transparent text-black p-2 rounded-lg mb-4 lg:mb-8 max-w-6xl mx-auto">
              <p className="text-2xl md:text-6xl font-bold mb-1 lg:mb-2">
                <span className="text-white">IMPORTANTE:</span>
              </p>
              <h2 className="text-2xl md:text-6xl font-bold mb-1 lg:mb-2">ÚNICA PLATAFORMA AUTÓNOMA</h2>
              <p className="text-2xl md:text-6xl font-bold text-[#DC2625]">PROBABILIDAD AUMENTADA %</p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 gap-2 lg:gap-4 mb-4 lg:mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center text-yellow-200 bg-white/10 rounded-lg p-2 lg:p-4">
                <CheckCircle className="w-4 h-4 lg:w-6 lg:h-6 mr-2 text-green-400" />
                <span className="font-bold text-sm lg:text-base">Soporte directo por Whatsapp 24 hs</span>
              </div>
              <div className="flex items-center justify-center text-yellow-200 bg-white/10 rounded-lg p-2 lg:p-4">
                <CheckCircle className="w-4 h-4 lg:w-6 lg:h-6 mr-2 text-green-400" />
                <span className="font-bold text-sm lg:text-base">Depósito y retiro 24 hs</span>
              </div>
            </div>
          </div>


          {/* Location with Argentina Flag */}
          <div className="flex justify-center ">
          <motion.div
            className=" flex justify-center w-[300px] items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-1 rounded-full"
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(34, 197, 94, 0.3)',
            }}
          >
           
            <MapPin className="w-4 h-4 text-blue-400" />
            {loadingLocalidad ? (
              <div className="h-4 bg-white/20 rounded animate-pulse w-24" />
            ) : (
              <span className="text-white font-medium">{localidad || 'Argentina'}</span>
            )}
             <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            >
              🇦🇷
            </motion.div>
          </motion.div>
          
          </div>
          

          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-row justify-between items-center lg:-mt-10">
            <img
              src="https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/perfil-1-sf-m7V3yay2qNh7vln7.png"
              alt="Oso Izquierda"
              className="w-32 h-32 lg:w-[300px] lg:h-[300px]"
            />
             <Button
             onClick={handleWhatsAppClick}  
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-10 px-10 border rounded-2xl text-6xl border-2 border-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-600/50 -mt-10"
            >
                QUIERO MI USUARIO 
              
            </Button>
            <img
              src="https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/perfil-1-sf-m7V3yay2qNh7vln7.png"
              alt="Oso Derecha"
              className="w-32 h-32 lg:w-[300px] lg:h-[300px]"
            />
          </div>

          {/* Mobile Layout - Más compacto */}
          <div className="lg:hidden flex flex-col items-center mt-2">
            {/* Botón principal más pequeño */}
            <Button
            onClick={handleWhatsAppClick}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-6 border rounded-2xl text-3xl border-2 border-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-600/50"
            >
                  QUIERO MI USUARIO
            </Button>

            {/* Oso mucho más pequeño para móvil */}
            <div className="flex justify-start items-start h-full -mt-10">
              <img
                src="https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/perfil-1-sf-m7V3yay2qNh7vln7.png"
                alt="Oso"
                className="h-[auto] w-[auto] max-w-[400px] max-h-[400px] sm:w-32 sm:h-32 object-contain -mt-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Instructions Section */}
      <section className="py-16 bg-[url('https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/different-poker-chips-casino-table-dWxlyX01E0Tokb08-scaled.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-4 animate-pulse">
              Cómo registrarte y hacer una carga:
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      visibleSteps.includes(index)
                        ? step.color === "green"
                          ? "bg-green-500 border-green-400 text-white"
                          : "bg-yellow-500 border-yellow-400 text-black"
                        : "bg-slate-700 border-slate-600 text-slate-400"
                    }`}
                  >
                    <span className="font-bold text-sm">{step.id}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 transition-all duration-500 ${
                        visibleSteps.includes(index + 1) ? "bg-yellow-400" : "bg-slate-600"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.includes(index)
              const isEven = index % 2 === 0
              const IconComponent = step.icon

              if (step.id === 5) {
                return (
                  <div
                    key={step.id}
                    className={`text-center transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    <Card className="bg-green-800/90 border-green-400/50 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300 shadow-2xl">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-green-500 p-3 rounded-full mr-4">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-green-200">{step.title}</h3>
                        </div>
                        <p className="text-green-100 font-bold text-lg">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                )
              }

              if (step.id === 4) {
                return (
                  <div
                    key={step.id}
                    className={`text-center transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    <Card className="bg-yellow-800/90 border-yellow-400/50 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300 shadow-2xl">
                      <CardContent className="p-8">
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-green-500 p-3 rounded-full mr-4">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-green-200">{step.title}</h3>
                        </div>
                        <p className="text-green-100 font-bold text-lg">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                )
              }

              return (
                <div
                  key={step.id}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <div className={`grid lg:grid-cols-2 gap-8 items-stretch ${!isEven ? "lg:grid-flow-col-dense" : ""}`}>
                    <div className={`${!isEven ? "lg:col-start-2" : ""} flex`}>
                      <Card className="bg-slate-800/90 border-yellow-400/50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/20 w-full h-80 flex flex-col">
                        <CardContent className="p-8 flex flex-col justify-center h-full">
                          <div className="flex items-center mb-6">
                            <div className="bg-yellow-500 p-3 rounded-full mr-4">
                              <IconComponent className="w-8 h-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold text-yellow-200">{step.title}</h3>
                          </div>
                          <div className="space-y-2 flex-grow flex flex-col justify-center">
                            <p className="text-yellow-100 text-lg">
                              {step.description}{" "}
                              {step.highlight && (
                                <span className="underline text-yellow-400 font-bold animate-pulse">
                                  {step.highlight}
                                </span>
                              )}
                            </p>
                            {step.description2 && (
                              <p className="text-yellow-100 text-lg">
                                {step.description2}{" "}
                                {step.highlight2 && (
                                  <span className="underline text-yellow-400 font-bold animate-pulse">
                                    {step.highlight2}
                                  </span>
                                )}
                              </p>
                            )}
                          </div>
                          <div className="mt-6 flex justify-end">
                            <ArrowRight className="w-6 h-6 text-yellow-400 animate-bounce" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    {step.image && step.image !== "IMAGEN PASO 4" && (
                      <div className={`${!isEven ? "lg:col-start-1" : ""} flex`}>
                        <div className="bg-slate-700/60 rounded-lg h-80 w-full flex items-center justify-center border-2 border-slate-600/50 hover:border-yellow-400/50 transition-all duration-300">
                          <img
                            src={step.image || "/placeholder.svg"}
                            alt={`Paso ${step.id}`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Warning */}
          <div
            className={`text-center mb-8 mt-12 transition-all duration-700 ${
              visibleSteps.length >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-red-900/90 border-2 border-red-400 rounded-lg p-6 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="w-8 h-8 text-red-400 mr-3 animate-pulse" />
                <p className="text-red-200 font-bold text-xl">EL COMPROBANTE SOLO SIRVE PARA UNA SOLICITUD.</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`text-center transition-all duration-700 ${
              visibleSteps.length >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
             <Button
              onClick={handleWhatsAppClick}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-6 border rounded-2xl text-3xl border-2 border-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-600/50"
            >
                QUIERO MI USUARIO
            </Button>
          </div>
        </div>
      </section>

      {/* Video Tutorial Section */}
      <section className="py-16 bg-[url('https://green-dove-860908.hostingersite.com/wp-content/uploads/2025/07/10081437-A85pwoqkDpi7B969.jpg')] bg-cover bg-center overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-[600px] mx-auto">
            <div className="rounded-lg text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
                Cómo registrarte y hacer una carga:
              </h2>
              <div className="aspect-video rounded-lg mb-6 flex items-center justify-center">
                <iframe
                  src="https://www.youtube.com/embed/8PWCt8px29s?h=null&playlist=8PWCt8px29s&autoplay=0&controls=0&loop=0&autopause=0&playsinline=1&mute=0"
                  title="Video Tutorial"
                  className="w-[360px] h-[638px]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <Button
              onClick={handleWhatsAppClick}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-6 border rounded-2xl text-3xl border-2 border-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-600/50"
            >
                QUIERO MI USUARIO
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/5491134901491?text=Hola%20me%20gustar%C3%ADa%20crear%20un%20usuario%20y%20cargar!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 border-2 border-green-500 bg-transparent hover:bg-white text-white p-4 rounded-full shadow-lg "
        title="Contactar por WhatsApp"
      >
        <img src="https://static.whatsapp.net/rsrc.php/v4/yz/r/ujTY9i_Jhs1.png" className="w-8 h-8" />
      </a>
    </div>
  )
}
