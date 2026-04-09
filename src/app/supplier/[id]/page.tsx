import { getSupplier, getTemplates } from "@/actions"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Building, Tag, Info } from "lucide-react"
import CopyButton from "@/components/ui/CopyButton"

export const dynamic = "force-dynamic"

export default async function SupplierDetail({ params }: { params: { id: string } }) {
  const supplier = await getSupplier(params.id)
  if (!supplier) notFound()

  const templates = await getTemplates()
  const defaultTemplate = templates[0]

  // Substituir variáveis no template
  const replaceVariables = (text: string, contactName: string) => {
    if (!text) return ""
    return text
      .replace(/\[Nome_do_Fornecedor\]/g, supplier.nomeFantasia)
      .replace(/\[Nome_do_Contato\]/g, contactName || "Equipe Comercial")
      .replace(/\{NomeCotador\}/g, "[Seu Nome]")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{supplier.nomeFantasia}</h1>
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          supplier.status === 'Ativo' ? 'bg-green-100 text-green-800' :
          supplier.status === 'Inativo' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {supplier.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dados do Fornecedor */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2">
              <Building className="w-5 h-5 text-gray-500" />
              Dados Cadastrais
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Razão Social</p>
                <p className="font-medium">{supplier.razaoSocial}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">CNPJ</p>
                <p className="font-medium">{supplier.cnpj}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-1">
                  <Tag className="w-4 h-4" /> Categorias
                </p>
                <p className="font-medium">{supplier.categorias || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Localidade
                </p>
                <p className="font-medium">{supplier.localidade || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-1">
                  <Info className="w-4 h-4" /> Resumo do Catálogo
                </p>
                <p className="whitespace-pre-wrap">{supplier.catalogoResumo || "Sem informações adicionais."}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b pb-2">
              <Phone className="w-5 h-5 text-gray-500" />
              Contatos
            </h2>
            {supplier.contatos.length > 0 ? (
              <div className="space-y-4">
                {supplier.contatos.map((contato) => (
                  <div key={contato.id} className="p-3 bg-gray-50 rounded border border-gray-100">
                    <p className="font-medium text-gray-900">{contato.nome}</p>
                    {contato.cargo && <p className="text-xs text-gray-500 mb-2">{contato.cargo}</p>}

                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                          <Mail className="w-4 h-4 shrink-0" />
                          <span className="truncate">{contato.email}</span>
                        </div>
                        <CopyButton text={contato.email} label="" />
                      </div>

                      {contato.telefone && (
                        <div className="flex items-center justify-between group">
                          <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span className="truncate">{contato.telefone}</span>
                          </div>
                          <CopyButton text={contato.telefone} label="" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhum contato cadastrado.</p>
            )}
          </div>
        </div>

        {/* Área de Comunicação */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5" /> Script de Apresentação (Telefone/WhatsApp)
            </h3>
            <p className="text-blue-800 text-sm whitespace-pre-wrap leading-relaxed bg-white p-4 rounded border border-blue-100 shadow-sm">
              {defaultTemplate?.scriptApresentacao || "Nenhum script configurado."}
            </p>
            <div className="mt-3 flex justify-end">
              {defaultTemplate && <CopyButton text={defaultTemplate.scriptApresentacao} />}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-500" />
                Template de E-mail
              </h2>
              {defaultTemplate && (
                <div className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Remetente sugerido:</span> {defaultTemplate.remetente}
                  <div className="inline-block ml-2">
                    <CopyButton text={defaultTemplate.remetente} label="" />
                  </div>
                </div>
              )}
            </div>

            {!defaultTemplate ? (
              <div className="py-8 text-center text-gray-500">
                <p>Nenhum template configurado pelo administrador.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selecionar contato para aplicar no template */}
                {supplier.contatos.length > 0 && (
                  <div className="mb-4 bg-gray-50 p-3 rounded text-sm">
                    <span className="text-gray-600 font-medium mr-2">O template abaixo usa o nome:</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">{supplier.contatos[0].nome}</span>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Assunto</label>
                    <CopyButton text={replaceVariables(defaultTemplate.assunto, supplier.contatos[0]?.nome)} />
                  </div>
                  <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm">
                    {replaceVariables(defaultTemplate.assunto, supplier.contatos[0]?.nome)}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 mt-4">
                    <label className="block text-sm font-medium text-gray-700">Corpo da Mensagem</label>
                    <CopyButton text={replaceVariables(defaultTemplate.corpoEmail, supplier.contatos[0]?.nome)} />
                  </div>
                  <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm whitespace-pre-wrap min-h-[300px]">
                    {replaceVariables(defaultTemplate.corpoEmail, supplier.contatos[0]?.nome)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
