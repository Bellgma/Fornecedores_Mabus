"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupplier, updateSupplier } from "@/actions"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function SupplierForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const isEditing = !!initialData

  const [loading, setLoading] = useState(false)
  const [contacts, setContacts] = useState<any[]>(
    initialData?.contatos || [{ nome: "", email: "", telefone: "", cargo: "" }]
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      razaoSocial: formData.get("razaoSocial"),
      nomeFantasia: formData.get("nomeFantasia"),
      cnpj: formData.get("cnpj"),
      status: formData.get("status"),
      categorias: formData.get("categorias"),
      localidade: formData.get("localidade"),
      historico: formData.get("historico"),
      catalogoResumo: formData.get("catalogoResumo"),
      contatos: contacts.filter(c => c.nome && c.email).map(({ id: _id, supplierId: _supplierId, ...rest }) => rest)
    }

    try {
      if (isEditing) {
        await updateSupplier(initialData.id, data)
      } else {
        await createSupplier(data)
      }
      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Ocorreu um erro ao salvar o fornecedor.")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 border-b pb-4">
        <Link href="/admin" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Editar Fornecedor" : "Novo Fornecedor"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Dados Cadastrais</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Razão Social *</label>
              <input required name="razaoSocial" defaultValue={initialData?.razaoSocial} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia *</label>
              <input required name="nomeFantasia" defaultValue={initialData?.nomeFantasia} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ *</label>
              <input required name="cnpj" defaultValue={initialData?.cnpj} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" defaultValue={initialData?.status || "Ativo"} className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-blue-500">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Em Avaliação">Em Avaliação</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categorias (separadas por vírgula)</label>
              <input name="categorias" defaultValue={initialData?.categorias} placeholder="Ex: Equipamentos de TI, Materiais de Escritório" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localidade (Cidade/Estado)</label>
              <input name="localidade" defaultValue={initialData?.localidade} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Histórico de Preço / Observações</label>
              <input name="historico" defaultValue={initialData?.historico} placeholder="Ex: $$ - Bons prazos de entrega" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Resumo do Catálogo</label>
              <textarea name="catalogoResumo" defaultValue={initialData?.catalogoResumo} rows={3} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-semibold">Contatos</h2>
            <button
              type="button"
              onClick={() => setContacts([...contacts, { nome: "", email: "", telefone: "", cargo: "" }])}
              className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" /> Adicionar Contato
            </button>
          </div>

          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 border rounded-md relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nome *</label>
                    <input required value={contact.nome} onChange={(e) => { const newContacts = [...contacts]; newContacts[index].nome = e.target.value; setContacts(newContacts) }} className="w-full p-2 border rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">E-mail *</label>
                    <input required type="email" value={contact.email} onChange={(e) => { const newContacts = [...contacts]; newContacts[index].email = e.target.value; setContacts(newContacts) }} className="w-full p-2 border rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Telefone</label>
                    <input value={contact.telefone} onChange={(e) => { const newContacts = [...contacts]; newContacts[index].telefone = e.target.value; setContacts(newContacts) }} className="w-full p-2 border rounded text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Cargo</label>
                    <input value={contact.cargo} onChange={(e) => { const newContacts = [...contacts]; newContacts[index].cargo = e.target.value; setContacts(newContacts) }} className="w-full p-2 border rounded text-sm" />
                  </div>
                </div>
                {contacts.length > 1 && (
                  <button type="button" onClick={() => setContacts(contacts.filter((_, i) => i !== index))} className="text-red-500 hover:bg-red-50 p-2 rounded">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin" className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-50">
            Cancelar
          </Link>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Salvando..." : "Salvar Fornecedor"}
          </button>
        </div>
      </form>
    </div>
  )
}
