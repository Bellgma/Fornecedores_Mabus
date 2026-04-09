"use client"

import dynamic from "next/dynamic"

export const MapaWrapper = dynamic(() => import('@/components/mapa/MapaLeaflet'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center animate-pulse text-gray-500">Carregando mapa interativo...</div>
})
