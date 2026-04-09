"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix para os ícones padrão do Leaflet não carregando no Next.js
const iconFornecedor = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const iconTransportadora = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function MapaLeaflet({ fornecedores, transportadoras }: { fornecedores: any[], transportadoras: any[] }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-full w-full bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-500">Carregando mapa...</div>

  return (
    <MapContainer
      center={[-15.7801, -47.9292]} // Centro do Brasil aprox
      zoom={4}
      className="h-[600px] w-full rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {fornecedores.filter(f => f.latitude && f.longitude).map(f => (
        <Marker key={`f-${f.id}`} position={[f.latitude, f.longitude]} icon={iconFornecedor}>
          <Popup>
            <strong className="text-sm">{f.nomeFantasia}</strong><br/>
            <span className="text-xs text-gray-500">Fornecedor: {f.categorias}</span>
          </Popup>
        </Marker>
      ))}

      {transportadoras.filter(t => t.latitude && t.longitude).map(t => (
        <Marker key={`t-${t.id}`} position={[t.latitude, t.longitude]} icon={iconTransportadora}>
          <Popup>
            <strong className="text-sm text-red-600">{t.nome}</strong><br/>
            <span className="text-xs text-gray-500">Transportadora</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
