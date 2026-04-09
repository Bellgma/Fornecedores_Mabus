import { getDashboardMetrics, getRecentSuppliers } from "@/actions/dashboard"
import Link from "next/link"
import { ArrowRight, Search, Truck, UserPlus, PlayCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function Dashboard() {
  const metrics = await getDashboardMetrics()
  const recentSuppliers = await getRecentSuppliers()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Bom dia, cotador!</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Resumo rápido da base de fornecedores Mabus</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Cards */}
        <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fornecedores ativos</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{metrics.fornecedoresAtivos}</span>
            <span className="text-sm font-medium text-emerald-500">+12 este mês</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Categorias</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{metrics.categoriasMapeadas}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">segmentos mapeados</p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Transportadoras</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{metrics.transportadoras}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">com tabela de frete</p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cotações abertas</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{metrics.cotacoesAbertas}</span>
          </div>
          <p className="text-sm text-amber-500 dark:text-amber-500/80 mt-1">2 aguardando resposta</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fornecedores Recentes */}
        <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Fornecedores recentes</h2>
            <Link href="/fornecedores" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/5 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              Ver todos
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {recentSuppliers.map((supplier) => (
              <div key={supplier.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-transparent hover:border-gray-100 dark:hover:border-white/5 last:border-0">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                  {supplier.nomeFantasia.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">{supplier.nomeFantasia}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400">
                      {supplier.categorias.split(',')[0]}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{supplier.estado || 'BR'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acesso Rápido */}
        <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Acesso rápido</h2>

          <div className="grid gap-3">
            <Link href="/fornecedores" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all group">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Buscar fornecedor por produto</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/fretes" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all group">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Simular frete</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/cadastro" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all group">
              <div className="flex items-center gap-3">
                <UserPlus className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Cadastrar novo fornecedor</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/tutorial" className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all group">
              <div className="flex items-center gap-3">
                <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                <span className="font-medium text-gray-700 dark:text-gray-200">Ver tutorial do sistema</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
