import TokenGenerator from "@/components/TokenGenerator"
import { ShieldAlert } from "lucide-react"

export default function CadastroPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Cadastro Externo</h1>
        <p className="text-slate-500 font-medium mt-2">Gerenciamento de acessos e links de integração para parceiros.</p>
      </div>

      <TokenGenerator />

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">Painel de Cadastro Interno</h3>
        <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">A inserção manual de fornecedores pela equipa interna está sendo migrada para a nova arquitetura de dados e estará disponível na próxima atualização.</p>
        <button disabled className="bg-slate-100 text-slate-400 border border-slate-200 px-8 py-3.5 rounded-2xl text-sm font-bold cursor-not-allowed">
          Módulo em Manutenção
        </button>
      </div>
    </div>
  )
}
