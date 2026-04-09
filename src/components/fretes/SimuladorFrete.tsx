"use client"

import { useState } from "react"
import { Search, MapPin, Package, Scale, CreditCard, Truck } from "lucide-react"

export default function SimuladorFrete() {
  const [loading, setLoading] = useState(false)
  const [simulacao, setSimulacao] = useState<any[] | null>(null)

  const handleSimular = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulação do backend
    setTimeout(() => {
      setSimulacao([
        { id: 1, transportadora: "Transportadora Rápida (Recomendada)", logo: "TR", prazo: "3 dias úteis", valor: 45.90, recomendada: true },
        { id: 2, transportadora: "Correios PAC", logo: "CO", prazo: "7 dias úteis", valor: 32.50, recomendada: false },
        { id: 3, transportadora: "Jadlog Package", logo: "JD", prazo: "5 dias úteis", valor: 55.00, recomendada: false },
        { id: 4, transportadora: "Braspress", logo: "BP", prazo: "4 dias úteis", valor: 68.20, recomendada: false },
      ])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Dados da Cotação</h2>

          <form onSubmit={handleSimular} className="space-y-5">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Rotas
              </h3>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">CEP Origem (Fornecedor)</label>
                <input required placeholder="00000-000" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">CEP Destino (Mabus)</label>
                <input required placeholder="00000-000" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4" /> Dimensões
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Alt (cm)</label>
                  <input required type="number" min="1" defaultValue="10" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Larg (cm)</label>
                  <input required type="number" min="1" defaultValue="10" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Prof (cm)</label>
                  <input required type="number" min="1" defaultValue="10" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                    <Scale className="w-3 h-3" /> Peso (kg)
                  </label>
                  <input required type="number" step="0.1" defaultValue="1" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> Valor NF (R$)
                  </label>
                  <input required type="number" step="0.01" defaultValue="100.00" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-6 flex items-center justify-center gap-2">
              {loading ? "Simulando rotas..." : <><Search className="w-4 h-4" /> Calcular Frete</>}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-6 min-h-[500px]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resultados</h2>

          {!simulacao && !loading && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center">
              <Truck className="w-16 h-16 text-gray-200 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Preencha os dados ao lado para simular o frete.</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">A simulação consulta APIs de transportadoras em tempo real.</p>
            </div>
          )}

          {loading && (
            <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 dark:text-gray-400">Consultando tabelas...</p>
            </div>
          )}

          {simulacao && !loading && (
            <div className="space-y-4">
              {simulacao.map((opcao) => (
                <div key={opcao.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  opcao.recomendada
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/5'
                    : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                      opcao.recomendada
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300'
                    }`}>
                      {opcao.logo}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {opcao.transportadora.split('(')[0]}
                        {opcao.recomendada && (
                          <span className="text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">
                            Recomendada
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Prazo: {opcao.prazo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400">R$</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white ml-1">
                      {opcao.valor.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
