import { getSupplier } from "@/actions"
import SupplierForm from "@/components/admin/SupplierForm"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function EditSupplierPage({ params }: { params: { id: string } }) {
  const supplier = await getSupplier(params.id)
  if (!supplier) notFound()

  return <SupplierForm initialData={supplier} />
}
