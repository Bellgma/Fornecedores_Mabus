import { prisma } from "@/lib/prisma"
import { MapPin, Globe } from "lucide-react"
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
    <div className="space-y-8 animate-in fade-in duration-700 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Mapa Operacional</h1>
          <p className="text-slate-500 font-medium mt-2">Centro de controle geográfico de logística e parcerias.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
              <p className="text-sm font-black text-slate-800 leading-none">{fornecedores.length} Parceiros</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center border border-rose-200">
              <MapPin className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Rotas</p>
              <p className="text-sm font-black text-slate-800 leading-none">{transportadoras.length} Transporte</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 p-3 z-0 relative overflow-hidden group">
        <div className="absolute inset-0 z-10 pointer-events-none rounded-[2.5rem] border-4 border-slate-50/50 mix-blend-overlay"></div>
        <div className="absolute top-8 left-8 z-20 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
          <Globe className="w-4 h-4 text-purple-500" />
          <span className="text-xs font-bold text-slate-700 tracking-wide">Visão em Tempo Real</span>
        </div>
        <MapaWrapper fornecedores={fornecedores} transportadoras={transportadoras} />
      </div>
    </div>
  )
}
