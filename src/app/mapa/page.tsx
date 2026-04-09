import { prisma } from "@/lib/prisma"
import { MapPin } from "lucide-react"
import { MapaWrapper } from "@/components/mapa/MapaWrapper"

export const revalidate = 0

export default async function MapaPage() {
  const [fornecedores, transportadoras] = await Promise.all([
    prisma.supplier.findMany({
      where: { latitude: { not: null }, longitude: { not: null } },
      select: { id: true, nomeFantasia: true, categorias: true, latitude: true, longitude: true }
    }),
    prisma.carrier.findMany({
      where: { latitude: { not: null }, longitude: { not: null } },
      select: { id: true, nome: true, latitude: true, longitude: true }
    })
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mapa de Operações</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Visualize a distribuição geográfica dos parceiros da Mabus</p>
      </div>

      <div className="bg-white dark:bg-[#1f1f1f] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-white/5 flex gap-6">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="font-medium text-gray-700 dark:text-gray-200">Fornecedores ({fornecedores.length})</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-5 h-5 text-red-500" />
          <span className="font-medium text-gray-700 dark:text-gray-200">Transportadoras ({transportadoras.length})</span>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-2 z-0 relative">
        <MapaWrapper fornecedores={fornecedores} transportadoras={transportadoras} />
      </div>
    </div>
  )
}
