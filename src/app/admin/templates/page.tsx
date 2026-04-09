import { getTemplates } from "@/actions"
import TemplateForm from "./TemplateForm"

export const dynamic = "force-dynamic"

export default async function TemplatesPage() {
  const templates = await getTemplates()
  const defaultTemplate = templates.length > 0 ? templates[0] : null

  return <TemplateForm initialData={defaultTemplate} />
}
