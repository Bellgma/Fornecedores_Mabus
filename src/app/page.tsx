import { getDashboardMetrics, getRecentSuppliers } from "@/actions/dashboard"
import Link from "next/link"
import { ArrowRight, Search, Truck, UserPlus, PlayCircle, BarChart3, TrendingUp } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function Dashboard() {
  const metrics = await getDashboardMetrics()
  const recentSuppliers = await getRecentSuppliers()

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Visão Operacional</h1>
          <p className="text-slate-500 font-medium mt-2">Métricas em tempo real da base de fornecedores e logística.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-bold text-slate-700">Sistema Online</span>
        </div>
      </header>

      {/* Bento Grid Top */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Dark Tech Card (Destaque Principal) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-950 to-slate-900 rounded-3xl p-8 border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
            <BarChart3 className="w-64 h-64 text-purple-400" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-xs font-bold text-purple-400 tracking-widest uppercase mb-1">Total da Base</p>
              <h3 className="text-2xl font-bold text-white">Fornecedores Ativos</h3>
            </div>
            <div className="mt-8 flex items-end gap-4">
              <span className="text-7xl font-black text-white tracking-tighter leading-none">{metrics.fornecedoresAtivos}</span>
              <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">+12 este mês</span>
              </div>
            </div>
          </div>
        </div>

        {/* White Bento Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Diversidade</p>
          <h3 className="text-slate-600 font-medium">Categorias Mapeadas</h3>
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-5xl font-black text-slate-800 tracking-tighter">{metrics.categoriasMapeadas}</span>
            <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100 w-fit">
              Segmentos ativos
            </span>
          </div>
        </div>

        {/* White Bento Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow">
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">Logística</p>
          <h3 className="text-slate-600 font-medium">Transportadoras</h3>
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-5xl font-black text-slate-800 tracking-tighter">{metrics.transportadoras}</span>
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100 w-fit">
              Rotas disponíveis
            </span>
          </div>
        </div>

      </div>

      {/* Bento Grid Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Fornecedores Recentes (2/3 da largura) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Novos Parceiros</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Últimos fornecedores cadastrados na base.</p>
            </div>
            <Link href="/fornecedores" className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
              Ver Tabela Completa
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {recentSuppliers.map((supplier) => (
              <Link href={`/fornecedores/${supplier.id}`} key={supplier.id} className="group block">
                <div className="flex items-center gap-5 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-purple-50/50 hover:border-purple-200 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-colors">
                    {supplier.nomeFantasia.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-purple-700 transition-colors">{supplier.nomeFantasia}</h4>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-200/70 text-slate-600 uppercase tracking-wide">
                        {supplier.categorias.split(',')[0] || "Geral"}
                      </span>
                      <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                        {supplier.estado || 'BR'}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all shadow-sm">
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
            {recentSuppliers.length === 0 && (
              <div className="text-center py-8 text-slate-500">Nenhum fornecedor cadastrado ainda.</div>
            )}
          </div>
        </div>

        {/* Quick Actions (1/3 da largura) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <h2 className="text-xl font-black text-slate-800 tracking-tight mb-8">Acesso Rápido</h2>

          <div className="flex flex-col gap-4">
            <Link href="/fornecedores" className="relative overflow-hidden flex items-center p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-purple-300 hover:shadow-[0_8px_20px_rgba(168,85,247,0.15)] transition-all group">
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mr-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">Buscar Produto</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Catálogo de fornecedores</p>
              </div>
            </Link>

            <Link href="/fretes" className="relative overflow-hidden flex items-center p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-amber-300 hover:shadow-[0_8px_20px_rgba(245,158,11,0.15)] transition-all group">
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mr-4 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">Simular Frete</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Calculadora de rotas</p>
              </div>
            </Link>

            <Link href="/cadastro" className="relative overflow-hidden flex items-center p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-emerald-300 hover:shadow-[0_8px_20px_rgba(16,185,129,0.15)] transition-all group">
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mr-4 group-hover:scale-110 transition-transform">
                <UserPlus className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800">Novo Cadastro</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Gerar token de acesso</p>
              </div>
            </Link>

            {/* Main Action Button */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 transition-all">
                <PlayCircle className="w-5 h-5" />
                Iniciar Cotação Rápida
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
