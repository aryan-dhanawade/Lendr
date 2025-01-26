"use client"

import { Home, DollarSign, BarChart2, MessageCircle, Users, PieChart, User, HandCoins, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: DollarSign, label: "Loans", href: "/loans" },
  { icon: HandCoins, label: "Lending", href: "/lending" },
  { icon: MessageCircle, label: "Financial Literacy", href: "/literacy" },
  { icon: Users, label: "Community Trust", href: "/community" },
  { icon: PieChart, label: "Analytics", href: "/analytics" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { open } = useSidebar()

  return (
    <>
      <SidebarTrigger className="fixed top-4 right-4 z-50">
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
      <Sidebar
        side="right"
        collapsible="offcanvas"
        className={`w-64 transition-all duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <SidebarHeader className="h-14 flex items-center px-4">
          <span className="text-xl font-bold">Lendr</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}

