import { Search, Bell, Settings, Grid3X3, Mail, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">GED</span>
            </div>
            <span className="font-semibold text-gray-900"></span>
          </div>
          <nav className="flex space-x-1">
           
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Rechercher" className="pl-10 w-64" />
          </div>
          <div className="flex items-center space-x-2">
            
           
          </div>
        </div>
      </div>
    </header>
  )
}
