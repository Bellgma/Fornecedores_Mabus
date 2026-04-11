import SimuladorFrete from "@/components/fretes/SimuladorFrete"

export default function FretesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Simulador de Rotas</h1>
        <p className="text-slate-500 font-medium mt-2">Inteligência logística para encontrar o melhor custo-benefício.</p>
      </div>

      <SimuladorFrete />
    </div>
  )
}
