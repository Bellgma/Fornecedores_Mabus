import { ThemeProvider } from "@/components/ThemeProvider"
import Sidebar from "@/components/Sidebar"
import "./globals.css"

export const metadata = {
  title: "Mabus Cotações",
  description: "Sistema interno de cotações e gestão de fornecedores.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-gray-100 flex transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Sidebar />
          <main className="flex-1 overflow-x-hidden ml-64 p-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
