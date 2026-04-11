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
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-8">
          <h2 className="text-xl font-black text-slate-800 tracking-tight mb-8">Parâmetros</h2>

          <form onSubmit={handleSimular} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4" /> Trajeto
              </h3>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Origem (CEP)</label>
                <input required placeholder="00000-000" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Destino (CEP)</label>
                <input required placeholder="00000-000" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400" />
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Package className="w-4 h-4" /> Volumes
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Alt (cm)</label>
                  <input required type="number" min="1" defaultValue="10" className="w-full px-3 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800 text-center" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Larg (cm)</label>
                  <input required type="number" min="1" defaultValue="10" className="w-full px-3 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800 text-center" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Prof (cm)</label>
                  <input required type="number" min="1" defaultValue="10" className="w-full px-3 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800 text-center" />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" /> Peso (kg)
                  </label>
                  <input required type="number" step="0.1" defaultValue="1" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" /> Valor (R$)
                  </label>
                  <input required type="number" step="0.01" defaultValue="100.00" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              {loading ? "Processando API..." : <><Search className="w-5 h-5" /> Encontrar Melhor Rota</>}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-8 min-h-[600px] flex flex-col">
          <h2 className="text-xl font-black text-slate-800 tracking-tight mb-8">Painel de Cotações</h2>

          {!simulacao && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
                <Truck className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-800">Pronto para cotar</h3>
              <p className="text-slate-500 font-medium mt-2 max-w-sm">Preencha os parâmetros de carga ao lado para consultar a disponibilidade nas transportadoras integradas.</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-slate-500 font-bold tracking-widest uppercase text-sm animate-pulse">Sincronizando com Transportadoras...</p>
            </div>
          )}

          {simulacao && !loading && (
            <div className="space-y-4">
              {simulacao.map((opcao) => (
                <div key={opcao.id} className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${
                  opcao.recomendada
                    ? 'border-emerald-300 bg-gradient-to-r from-emerald-50/50 to-white shadow-[0_4px_20px_rgba(16,185,129,0.1)]'
                    : 'border-slate-200 hover:border-purple-200 hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm ${
                      opcao.recomendada
                        ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-white border border-slate-200 text-slate-600'
                    }`}>
                      {opcao.logo}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg flex items-center gap-3">
                        {opcao.transportadora.split('(')[0]}
                        {opcao.recomendada && (
                          <span className="text-[10px] uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg font-black">
                            Recomendação do Sistema
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium mt-1">Prazo estimado: <strong className="text-slate-700">{opcao.prazo}</strong></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-400">R$</span>
                    <span className="text-3xl font-black text-slate-800 tracking-tighter ml-1">
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
