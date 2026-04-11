import { getSuppliers } from "@/actions"
import Link from "next/link"
import { Search, MapPin, Tag, Building, ArrowRight, UserPlus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function FornecedoresPage({
  searchParams,
}: {
  searchParams: { q?: string; uf?: string }
}) {
  const query = searchParams.q || ""
  const uf = searchParams.uf || ""

  const suppliers = await getSuppliers(query, uf)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Gestão de Fornecedores</h1>
          <p className="text-slate-500 font-medium mt-2">Busque, filtre e gerencie toda a sua base de parceiros.</p>
        </div>
        <Link
          href="/cadastro"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Cadastrar Parceiro
        </Link>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
        <form className="flex flex-col sm:flex-row gap-4" action="/fornecedores">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Buscar por nome, razão social ou CNPJ..."
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
          <div className="sm:w-64 relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
            <select
              name="uf"
              defaultValue={uf}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white appearance-none transition-all text-slate-800"
            >
              <option value="">Brasil (Todos os Estados)</option>
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
            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold transition-colors text-sm hover:bg-slate-800"
          >
            Filtrar
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Link href={`/fornecedores/${supplier.id}`} key={supplier.id} className="group">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-purple-300 transition-all h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 font-black text-xl group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-colors">
                    {supplier.nomeFantasia.substring(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-purple-700 transition-colors">
                      {supplier.nomeFantasia}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mt-1 tracking-wider uppercase">
                      <Building className="w-3.5 h-3.5" /> {supplier.cnpj}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Status</span>
                  <span className={`px-3 py-1 text-[11px] rounded-lg font-bold uppercase tracking-wider border ${
                    supplier.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    supplier.status === 'Inativo' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {supplier.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Local</span>
                   <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                     <MapPin className="w-4 h-4 text-slate-400" />
                     {supplier.cidade ? `${supplier.cidade} - ${supplier.estado}` : supplier.estado || 'N/A'}
                   </span>
                </div>

                {supplier.categorias && (
                  <div>
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase block mb-2">Segmentos</span>
                    <div className="flex flex-wrap gap-2">
                      {supplier.categorias.split(',').map((cat, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          {cat.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">{supplier.contatos.length} Contato(s)</span>
                  <span className="text-purple-600 font-bold flex items-center gap-1.5 group-hover:gap-2 transition-all bg-purple-50 px-3 py-1.5 rounded-xl">
                    Abrir Perfil <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {suppliers.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-800">Nenhum resultado</h3>
            <p className="text-slate-500 font-medium mt-2">Nenhum fornecedor corresponde aos filtros atuais.</p>
          </div>
        )}
      </div>
    </div>
  )
}
