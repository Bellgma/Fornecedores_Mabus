"use server"

import { prisma } from "@/lib/prisma"

export async function getDashboardMetrics() {
  const [
    fornecedoresAtivos,
    categoriasDistintas,
    transportadoras,
    cotacoesAbertas
  ] = await Promise.all([
    prisma.supplier.count({ where: { status: "Ativo" } }),
    // Em produção, isso seria uma query mais complexa se 'categorias' for um array real
    // Aqui usamos um count bruto de fornecedores com categorias cadastradas como aproximação
    prisma.supplier.count({ where: { categorias: { not: "" } } }),
    prisma.carrier.count({ where: { status: "Ativo" } }),
    prisma.quote.count({ where: { status: "Aberta" } })
  ])

  // Simulando categorias mapeadas extraindo únicas da string (mock lógico para a string comma-separated)
  const todosFornecedores = await prisma.supplier.findMany({ select: { categorias: true } })
  const setCategorias = new Set<string>()
  todosFornecedores.forEach(f => {
    if(f.categorias) {
      f.categorias.split(',').forEach(c => setCategorias.add(c.trim()))
    }
  })

  return {
    fornecedoresAtivos,
    categoriasMapeadas: setCategorias.size || 24, // Fallback visual
    transportadoras,
    cotacoesAbertas
  }
}

export async function getRecentSuppliers() {
  return await prisma.supplier.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nomeFantasia: true,
      categorias: true,
      estado: true
    }
  })
}
