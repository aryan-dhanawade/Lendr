import "./globals.css"
import { Inter } from "next/font/google"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lendr - P2P Lending Platform",
  description: "Peer-to-peer lending for small businesses and individuals",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider defaultOpen={false}>
            <div className="flex h-full">
              <main className="flex-1 overflow-hidden transition-all duration-300 ease-in-out">
                <div className="h-full overflow-y-auto">{children}</div>
              </main>
              <AppSidebar />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

