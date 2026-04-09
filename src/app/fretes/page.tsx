import SimuladorFrete from "@/components/fretes/SimuladorFrete"

export default function FretesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Simulador de Fretes</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Compare preços e prazos de entrega entre transportadoras homologadas.</p>
      </div>

      <SimuladorFrete />
    </div>
  )
}
