"use client"

import { useState } from "react"
import { saveTemplate } from "@/actions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TemplateForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSaved(false)

    const formData = new FormData(e.currentTarget)
    const data = {
      id: initialData?.id,
      nome: formData.get("nome"),
      assunto: formData.get("assunto"),
      scriptApresentacao: formData.get("scriptApresentacao"),
      corpoEmail: formData.get("corpoEmail"),
      remetente: formData.get("remetente"),
    }

    try {
      await saveTemplate(data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error(error)
      alert("Erro ao salvar o template.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link href="/admin" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Configuração de Templates</h1>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800">
        <p className="font-semibold mb-1">Dica sobre Variáveis Dinâmicas:</p>
        <p>Você pode utilizar as seguintes tags no texto para que sejam substituídas automaticamente na tela do cotador:</p>
        <ul className="list-disc ml-5 mt-1">
          <li><code>[Nome_do_Fornecedor]</code> - Nome Fantasia do fornecedor.</li>
          <li><code>[Nome_do_Contato]</code> - Nome do primeiro contato cadastrado.</li>
          <li><code>{`{NomeCotador}`}</code> - Campo genérico para o cotador substituir pelo seu nome.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <input type="hidden" name="nome" value="Template Padrão" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Remetente Padrão (De:)</label>
            <input
              required
              name="remetente"
              defaultValue={initialData?.remetente || "cotacao@mabus.com.br"}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assunto do E-mail</label>
            <input
              required
              name="assunto"
              defaultValue={initialData?.assunto || "Cotação de Produtos/Serviços - Mabus Empresarial LTDA - Prazo: [DD/MM/AAAA]"}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Script de Apresentação (Telefone/WhatsApp)</label>
            <textarea
              required
              name="scriptApresentacao"
              rows={4}
              defaultValue={initialData?.scriptApresentacao || "Olá, bom dia/boa tarde. Meu nome é {NomeCotador}, falo da Mabus Empresarial LTDA. Somos uma empresa que atua com fornecimento para órgãos governamentais e gostaríamos de incluí-los no nosso painel de fornecedores..."}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Corpo do E-mail Padrão</label>
            <textarea
              required
              name="corpoEmail"
              rows={15}
              defaultValue={initialData?.corpoEmail || `Prezado(a) [Nome_do_Contato] / Equipe Comercial,

Somos da Mabus Empresarial LTDA, fornecedores de produtos e serviços para entidades governamentais.

Gostaríamos de solicitar a cotação com a melhor condição comercial (preço e prazo de entrega) para os itens abaixo listados:

1. [Descrição do Item 1 - Quantidade - Especificações]
2. [Descrição do Item 2 - Quantidade - Especificações]

Condições da Cotação:
* Prazo limite para resposta: [DD/MM/AAAA] até às [HH:MM].
* Por favor, informar na proposta os prazos de entrega, validade e condições de pagamento.
* Os valores devem incluir todos os impostos e frete.

Ficamos no aguardo da sua proposta.

Atenciosamente,

{NomeCotador}
Departamento de Compras | Mabus Empresarial LTDA`}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          {saved && <span className="text-green-600 font-medium">Template salvo com sucesso!</span>}
          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Salvando..." : "Salvar Configurações"}
          </button>
        </div>
      </form>
    </div>
  )
}
