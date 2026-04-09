export default function SucessoCadastro() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] p-4">
      <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cadastro Enviado!</h1>
        <p className="text-gray-500 dark:text-gray-400">Seus dados foram recebidos com sucesso e estão em análise pela nossa equipe. Entraremos em contato em breve.</p>
      </div>
    </div>
  )
}
