"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function CopyButton({ text, label = "Copiar" }: { text: string, label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <button
      aria-label={label ? `Copiar ${label}` : "Copiar conteúdo para a área de transferência"}
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copiado!" : label}
    </button>
  )
}
