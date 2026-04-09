const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.supplier.create({
    data: {
      razaoSocial: 'Tecno Eletrônicos Ltda',
      nomeFantasia: 'Tecno Eletrônicos',
      cnpj: '11.111.111/0001-11',
      status: 'Ativo',
      categorias: 'Eletrônicos',
      estado: 'SP',
      latitude: -23.5505,
      longitude: -46.6333,
    }
  })

  await prisma.supplier.create({
    data: {
      razaoSocial: 'MetalPro Indústria',
      nomeFantasia: 'MetalPro Ind.',
      cnpj: '22.222.222/0001-22',
      status: 'Ativo',
      categorias: 'Metalurgia',
      estado: 'MG',
      latitude: -19.9208,
      longitude: -43.9378,
    }
  })

  await prisma.carrier.create({
    data: {
      nome: 'Transportadora Rápida',
      cnpj: '33.333.333/0001-33',
    }
  })

  await prisma.quote.create({
    data: {
      status: 'Aberta',
      descricao: 'Cotação de Notebooks',
    }
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
