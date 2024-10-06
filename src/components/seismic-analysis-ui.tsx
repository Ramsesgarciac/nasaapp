"use client"

import { useState, useEffect } from 'react'
import { Upload, Download, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function SeismicAnalysisUi() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)

  const waveCards = [
    { title: 'Onda P',cant:3, image: '/img/OndasP.jpeg',eventos:[{evento:1, start: '757.40 s', end: '858.40 s', duration: '101.00 s'}, {evento:'2', start: '1359.40 s', end: '1430.45 s', duration: '71.05 s'}, {evento:'3', start: '3252.55 s', end: '3350.95 s', duration: '98.40  s'}], imgDec: "/img/ondasPdec.jpeg" },
    { title: 'Onda S',cant:2, image: '/img/OndasS.jpeg',eventos:[{evento:1, start: '1370.05  s', end: '1370.05  s', duration: '0.00 s'}, {evento:'2', start: '1370.20 s', end: '1376.15 s', duration: '5.95 s'}], imgDec: "/img/ondasSdet.jpeg" },
    { title: 'Onda Superficial',cant:4, image: '/img/OndasSup.jpeg', eventos:[{evento:1, start: '755.05 s', end: '861.40  s', duration: '106.35  s'},, {evento:'2', start: '1369.40 s', end: '1430.45 s', duration: '61.05 s'}, {evento:'3', start: '2545.80 s', end: '2637.15 s', duration: '91.35 s'}, , {evento:'4', start: '3250.00 s', end: '3358.05 s', duration: '108.05 s'}], imgDec: "/img/ondasSupdet.jpeg" },
  ]

  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = `${Math.random() * 100}vw`
      star.style.top = `${Math.random() * 100}vh`
      star.style.animationDuration = `${Math.random() * 3 + 2}s`
      document.body.appendChild(star)

      setTimeout(() => {
        star.remove()
      }, 5000)
    }

    const starInterval = setInterval(createStar, 100)

    return () => clearInterval(starInterval)
  }, [])

  const handleCardClick = (card) => {
    setSelectedCard(card)
    if (window.innerWidth < 768) {
      setIsMobileModalOpen(true)
    }
  }

  const DetailCard = ({ card, isMobile = false }) => (
    <Card className={`bg-opacity-30 backdrop-blur-lg bg-blue-800 ${isMobile ? 'w-full' : ''}`}>
      <CardHeader>
        <CardTitle className="text-blue-300">{card.title} - Detección</CardTitle>
        <h2 className="text-blue-300">  -  Sismo Intensidad Media</h2>
      </CardHeader>
      <CardContent>
        <Image src={card.imgDec} alt="Detección" width={600} height={400} className="rounded-lg mb-4" />
        <div className="mb-4">
        <p className="text-blue-300">Cantidad de eventos: {card.cant}</p>
        <br />
        {card.eventos.map((evento, index) => (
          <div key={index} className="mb-2">
            <p className="text-blue-300">Evento {evento.evento}:</p>
            <p className="text-blue-300">Inicio: {evento.start}</p>
            <p className="text-blue-300">Fin: {evento.end}</p>
            <p className="text-blue-300">Duración: {evento.duration}</p>
          </div>
        ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 bg-blue-500 text-blue-100 hover:bg-blue-600">
              <Download className="mr-2 h-4 w-4" /> Descargar Archivos
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0d14] text-blue-300">
            <DialogHeader>
              <DialogTitle className="text-blue-300">Descargar Archivos</DialogTitle>
            </DialogHeader>
            <div className="flex justify-around py-4">
              <Button className="bg-red-500 hover:bg-red-600 text-blue-100">Descargar PDF</Button>
              <Button className="bg-green-500 hover:bg-green-600 text-blue-100">Descargar CSV</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#0a0d14] text-blue-300 overflow-hidden">
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        .star {
          position: fixed;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0d14] bg-opacity-50 backdrop-blur-lg p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-300">Análisis Sísmico</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-blue-100 hover:bg-blue-600">
              <Upload className="mr-2 h-4 w-4" /> Subir Archivos
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0d14] text-blue-300">
            <DialogHeader>
              <DialogTitle className="text-blue-300">Subir Archivos</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p>Seleccione archivos CSV o MiniSEED para subir.</p>
              <input type="file" accept=".csv,.mseed" className="text-sm text-blue-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-500 file:text-blue-100
                hover:file:bg-blue-600" />
            </div>
          </DialogContent>
        </Dialog>
      </nav>

      <div className="pt-20 px-4 md:px-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 overflow-y-auto max-h-[calc(100vh-5rem)] pr-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900">
          {waveCards.map((card, index) => (
            <Card key={index} className="mb-4 bg-opacity-30 backdrop-blur-lg bg-blue-800 hover:bg-blue-700 transition cursor-pointer"
                  onClick={() => handleCardClick(card)}>
              <CardHeader>
                <CardTitle className="text-blue-300">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={card.image} alt={card.title} width={400} height={200} className="rounded-lg mb-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="hidden md:block md:w-1/2 mt-4 md:mt-0">
          {selectedCard && <DetailCard card={selectedCard} />}
        </div>
      </div>

      {isMobileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 md:hidden">
          <div className="w-full max-w-md">
            <Button 
              className="absolute top-66 right-8 z-20 bg-transparent hover:bg-blue-700"
              onClick={() => setIsMobileModalOpen(false)}
            >
              <X className="h-6 w-6 text-blue-300" />
            </Button>
            {selectedCard && <DetailCard card={selectedCard} isMobile={true} />}
          </div>
        </div>
      )}
    </div>
  )
}