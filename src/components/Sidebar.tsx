"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Map as MapIcon,
  Truck,
  UserPlus,
  HelpCircle,
  Hexagon
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItemClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950
    ${isActive(path)
      ? 'bg-gradient-to-r from-purple-600/20 to-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.1)]'
      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
    }
  `

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-950 border-r border-white/5 flex flex-col shadow-2xl z-50">
      <div className="p-8 pb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Hexagon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight leading-tight">
            MABUS
          </h1>
          <p className="text-[10px] font-bold text-purple-400 tracking-widest uppercase">Soluções B2G</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar">
        <div>
          <h2 className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Principal</h2>
          <nav className="space-y-1.5">
            <Link href="/" className={navItemClass("/")}>
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/fornecedores" className={navItemClass("/fornecedores")}>
              <Users className="w-5 h-5" /> Fornecedores
            </Link>
            <Link href="/mapa" className={navItemClass("/mapa")}>
              <MapIcon className="w-5 h-5" /> Mapa Operacional
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Logística & Dados</h2>
          <nav className="space-y-1.5">
            <Link href="/fretes" className={navItemClass("/fretes")}>
              <Truck className="w-5 h-5" /> Simular Fretes
            </Link>
            <Link href="/cadastro" className={navItemClass("/cadastro")}>
              <UserPlus className="w-5 h-5" /> Tokens & Cadastro
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Sistema</h2>
          <nav className="space-y-1.5">
            <Link href="/tutorial" className={navItemClass("/tutorial")}>
              <HelpCircle className="w-5 h-5" /> Onboarding
            </Link>
          </nav>
        </div>
      </div>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="w-9 h-9 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm shadow-[0_0_10px_rgba(168,85,247,0.2)]">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Julio Doe</p>
            <p className="text-xs text-slate-400 truncate">Cotador Sênior</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
