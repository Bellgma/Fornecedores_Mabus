"use client"

import { useState } from "react"
import { Copy, Check, Link as LinkIcon } from "lucide-react"

export default function TokenGenerator() {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/token', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        setUrl(data.url)
      }
    } catch (error) {
      console.error(error)
      alert("Erro ao gerar link")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!url) return
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 flex items-center justify-center shrink-0 shadow-sm">
          <LinkIcon className="w-8 h-8 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Convite de Onboarding</h3>
          <p className="text-sm font-medium text-slate-500 mt-2 max-w-2xl">
            Gere um link criptografado e temporário (válido por 7 dias) para enviar ao fornecedor. Ele mesmo poderá preencher os dados, que entrarão no sistema como <strong className="text-slate-700">Em Análise</strong>.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          {!url ? (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-md disabled:opacity-50"
            >
              {loading ? "Gerando Token..." : "Gerar Link de Convite"}
            </button>
          ) : (
            <div className="flex items-center gap-2 max-w-md w-full">
              <input
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-slate-50 border border-purple-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />
              <button
                aria-label="Copiar link"
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-2xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
