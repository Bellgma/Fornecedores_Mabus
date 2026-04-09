"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getSuppliers(query?: string, categoria?: string) {
  return await prisma.supplier.findMany({
    where: {
      AND: [
        query ? {
          OR: [
            { nomeFantasia: { contains: query } },
            { razaoSocial: { contains: query } },
            { cnpj: { contains: query } },
          ]
        } : {},
        categoria ? { categorias: { contains: categoria } } : {}
      ]
    },
    include: { contatos: true },
    orderBy: { nomeFantasia: "asc" }
  })
}

export async function getSupplier(id: string) {
  return await prisma.supplier.findUnique({
    where: { id },
    include: { contatos: true }
  })
}

export async function createSupplier(data: any) {
  const { contatos, ...supplierData } = data
  const result = await prisma.supplier.create({
    data: {
      ...supplierData,
      contatos: {
        create: contatos
      }
    }
  })
  revalidatePath("/")
  revalidatePath("/admin")
  return result
}

export async function updateSupplier(id: string, data: any) {
  const { contatos, ...supplierData } = data

  await prisma.contact.deleteMany({ where: { supplierId: id } })

  const result = await prisma.supplier.update({
    where: { id },
    data: {
      ...supplierData,
      contatos: {
        create: contatos
      }
    }
  })
  revalidatePath("/")
  revalidatePath("/admin")
  return result
}

export async function deleteSupplier(id: string) {
  await prisma.supplier.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function getTemplates() {
  return await prisma.template.findMany({
    orderBy: { updatedAt: "desc" }
  })
}

export async function getTemplate(id: string) {
  return await prisma.template.findUnique({
    where: { id }
  })
}

export async function saveTemplate(data: any) {
  let result
  if (data.id) {
    result = await prisma.template.update({
      where: { id: data.id },
      data
    })
  } else {
    result = await prisma.template.create({ data })
  }
  revalidatePath("/")
  revalidatePath("/admin/templates")
  return result
}
