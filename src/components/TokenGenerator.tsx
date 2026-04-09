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
    <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
          <LinkIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Auto-cadastro para Fornecedores</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">
            Gere um link temporário (válido por 7 dias) para enviar ao fornecedor. Ele mesmo poderá preencher os dados cadastrais, que cairão no sistema como "Em análise".
          </p>

          {!url ? (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? "Gerando..." : "Gerar Link de Cadastro"}
            </button>
          ) : (
            <div className="flex items-center gap-2 max-w-xl">
              <input
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-white dark:bg-[#121212] border border-blue-200 dark:border-blue-500/30 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20 hover:bg-blue-200 dark:hover:bg-blue-500/30 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
