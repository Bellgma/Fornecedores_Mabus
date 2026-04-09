import TokenGenerator from "@/components/TokenGenerator"

export default function CadastroPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cadastro de Fornecedor</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Adicione um novo parceiro à base ou gere um link para auto-cadastro.</p>
      </div>

      <TokenGenerator />

      <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Ou se preferir, cadastre manualmente (Funcionalidade em construção no novo layout)</p>
        <button disabled className="bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 px-6 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
          Formulário Interno (Em breve)
        </button>
      </div>
    </div>
  )
}
