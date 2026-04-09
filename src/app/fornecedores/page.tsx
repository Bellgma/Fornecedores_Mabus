import { getSuppliers } from "@/actions"
import Link from "next/link"
import { Search, MapPin, Tag, Building, ArrowRight } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function FornecedoresPage({
  searchParams,
}: {
  searchParams: { q?: string; uf?: string }
}) {
  const query = searchParams.q || ""
  const uf = searchParams.uf || ""

  // Custom server action call here - assuming we modified the existing getSuppliers
  // or we pass uf instead of category for now to fit the new requirements
  const suppliers = await getSuppliers(query, uf)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestão de Fornecedores</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Busque e gerencie sua base de parceiros</p>
        </div>
        <Link
          href="/cadastro"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Cadastrar Fornecedor
        </Link>
      </div>

      <div className="bg-white dark:bg-[#1f1f1f] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-white/5">
        <form className="flex flex-col sm:flex-row gap-4" action="/fornecedores">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Buscar por nome, razão social ou CNPJ..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
            />
          </div>
          <div className="sm:w-48 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              name="uf"
              defaultValue={uf}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none transition-all"
            >
              <option value="">Todos os Estados</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="PR">Paraná</option>
              <option value="SC">Santa Catarina</option>
              <option value="RS">Rio Grande do Sul</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-lg font-medium transition-colors text-sm hover:bg-gray-800 dark:hover:bg-gray-100"
          >
            Filtrar
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Link href={`/fornecedores/${supplier.id}`} key={supplier.id} className="group">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-6 hover:shadow-md hover:border-blue-500/50 transition-all h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    {supplier.nomeFantasia.substring(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {supplier.nomeFantasia}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3" /> {supplier.cnpj}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-xs rounded-md font-medium border ${
                  supplier.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                  supplier.status === 'Inativo' ? 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10' :
                  'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                }`}>
                  {supplier.status}
                </span>
              </div>

              <div className="space-y-3 mt-2 flex-1">
                {supplier.categorias && (
                  <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Tag className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div className="flex flex-wrap gap-1.5">
                      {supplier.categorias.split(',').map((cat, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300">
                          {cat.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">
                    {supplier.cidade ? `${supplier.cidade} - ${supplier.estado}` : supplier.estado || 'Localização não informada'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{supplier.contatos.length} contatos</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ver perfil <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {suppliers.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white dark:bg-[#1f1f1f] rounded-2xl border border-gray-200 dark:border-white/5 border-dashed">
            <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nenhum fornecedor encontrado</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Tente ajustar seus filtros de busca ou cadastre um novo fornecedor.</p>
          </div>
        )}
      </div>
    </div>
  )
}
