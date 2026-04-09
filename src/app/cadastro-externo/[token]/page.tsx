import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function CadastroExternoPage({ params }: { params: { token: string } }) {
  const tokenRecord = await prisma.registrationToken.findUnique({
    where: { token: params.token }
  })

  if (!tokenRecord) {
    return notFound()
  }

  if (tokenRecord.used) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] p-4">
        <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Link Expirado</h1>
          <p className="text-gray-500 dark:text-gray-400">Este link de cadastro já foi utilizado. Solicite um novo link à equipe da Mabus.</p>
        </div>
      </div>
    )
  }

  if (new Date() > tokenRecord.expiresAt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] p-4">
        <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 max-w-md w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Link Vencido</h1>
          <p className="text-gray-500 dark:text-gray-400">O prazo de 7 dias deste link expirou. Solicite um novo link à equipe da Mabus.</p>
        </div>
      </div>
    )
  }

  // Server action para submeter o form externo
  async function submitRegistration(formData: FormData) {
    "use server"

    // Validar token novamente
    const currentToken = await prisma.registrationToken.findUnique({ where: { token: params.token } })
    if (!currentToken || currentToken.used || new Date() > currentToken.expiresAt) {
      throw new Error("Token inválido")
    }

    const data = {
      razaoSocial: formData.get("razaoSocial") as string,
      nomeFantasia: formData.get("nomeFantasia") as string,
      cnpj: formData.get("cnpj") as string,
      categorias: formData.get("categorias") as string,
      estado: formData.get("estado") as string,
      cidade: formData.get("cidade") as string,
      status: "Em análise",
      contatos: {
        create: [{
          nome: formData.get("contatoNome") as string,
          email: formData.get("contatoEmail") as string,
          telefone: formData.get("contatoTelefone") as string,
        }]
      }
    }

    try {
      await prisma.$transaction([
        prisma.supplier.create({ data }),
        prisma.registrationToken.update({
          where: { token: params.token },
          data: { used: true }
        })
      ])
    } catch (e) {
      console.error(e)
      // Idealmente lidar com erro de CNPJ duplicado (Unique) aqui
      throw new Error("Erro ao salvar cadastro")
    }

    redirect("/cadastro-externo/sucesso")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] p-4 py-12">
      <div className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cadastro de Fornecedor</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Bem-vindo à Mabus Empresarial. Por favor, preencha seus dados abaixo.</p>
        </div>

        <form action={submitRegistration} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Razão Social *</label>
              <input required name="razaoSocial" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome Fantasia *</label>
              <input required name="nomeFantasia" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CNPJ *</label>
              <input required name="cnpj" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Categorias de Produtos</label>
              <input name="categorias" placeholder="Ex: Informática, Papelaria" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cidade</label>
              <input name="cidade" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Estado (UF)</label>
              <select name="estado" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
                <option value="">Selecione...</option>
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
                <option value="MG">MG</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-white/10">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contato Principal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nome do Contato *</label>
                <input required name="contatoNome" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail *</label>
                <input required type="email" name="contatoEmail" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Telefone / WhatsApp</label>
                <input name="contatoTelefone" className="w-full px-3 py-2 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors mt-8">
            Enviar Cadastro
          </button>
        </form>
      </div>
    </div>
  )
}
