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
  Sun,
  Moon
} from "lucide-react"
import { useTheme } from "next-themes"

export default function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isActive = (path: string) => pathname === path

  const navItemClass = (path: string) => `
    flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-[#1a1a1a]
    ${isActive(path)
      ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200'
    }
  `

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-white/5 flex flex-col transition-colors duration-300 z-50">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
          Mabus Cotações
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Painel do cotador</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-8">
        <div>
          <h2 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Principal</h2>
          <nav className="space-y-1">
            <Link href="/" className={navItemClass("/")}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link href="/fornecedores" className={navItemClass("/fornecedores")}>
              <Users className="w-4 h-4" /> Fornecedores
            </Link>
            <Link href="/mapa" className={navItemClass("/mapa")}>
              <MapIcon className="w-4 h-4" /> Mapa
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Ferramentas</h2>
          <nav className="space-y-1">
            <Link href="/fretes" className={navItemClass("/fretes")}>
              <Truck className="w-4 h-4" /> Fretes
            </Link>
            <Link href="/cadastro" className={navItemClass("/cadastro")}>
              <UserPlus className="w-4 h-4" /> Cadastro fornecedor
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Ajuda</h2>
          <nav className="space-y-1">
            <Link href="/tutorial" className={navItemClass("/tutorial")}>
              <HelpCircle className="w-4 h-4" /> Tutorial
            </Link>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-white/5">
        <button
          aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-[#1a1a1a]"
        >
          {theme === "dark" ? (
            <><Sun className="w-4 h-4" /> Tema Claro</>
          ) : (
            <><Moon className="w-4 h-4" /> Tema Escuro</>
          )}
        </button>
      </div>
    </aside>
  )
}
