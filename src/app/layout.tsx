import Sidebar from "@/components/Sidebar"
import "./globals.css"

export const metadata = {
  title: "Mabus Soluções",
  description: "ERP B2G focado em inteligência operacional.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-800 flex">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
