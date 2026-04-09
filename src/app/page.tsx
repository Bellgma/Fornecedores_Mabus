import { getSuppliers } from "@/actions"
import Link from "next/link"
import { Search, MapPin, Tag } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; cat?: string }
}) {
  const query = searchParams.q || ""
  const cat = searchParams.cat || ""

  const suppliers = await getSuppliers(query, cat)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Buscar Fornecedores</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <form className="flex flex-col sm:flex-row gap-4" action="/">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Buscar por nome, razão social ou CNPJ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:w-64">
            <select
              name="cat"
              defaultValue={cat}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Todas as Categorias</option>
              <option value="TI">Equipamentos de TI</option>
              <option value="Escritório">Materiais de Escritório</option>
              <option value="Limpeza">Produtos de Limpeza</option>
              <option value="Serviços">Serviços Gerais</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
          >
            Filtrar
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Link href={`/supplier/${supplier.id}`} key={supplier.id}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {supplier.nomeFantasia}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  supplier.status === 'Ativo' ? 'bg-green-100 text-green-800' :
                  supplier.status === 'Inativo' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {supplier.status}
                </span>
              </div>

              <div className="text-sm text-gray-500 mb-4 flex-1">
                <p className="mb-2 truncate" title={supplier.razaoSocial}>
                  {supplier.razaoSocial}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4" />
                  <span className="truncate">{supplier.categorias || "Sem categoria"}</span>
                </div>
                {supplier.localidade && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{supplier.localidade}</span>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Contatos: {supplier.contatos.length}</span>
                  <span className="text-blue-600 font-medium">Ver detalhes &rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {suppliers.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-lg border border-gray-200 border-dashed">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum fornecedor encontrado</h3>
            <p className="text-gray-500">Tente ajustar seus termos de busca ou filtros.</p>
          </div>
        )}
      </div>
    </div>
  )
}
