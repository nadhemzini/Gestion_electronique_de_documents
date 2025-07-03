import { BarChart3, Calendar, FileText, Clock, Building, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  
  { icon: FileText, label: "Documents", active: true },
]


export function Sidebar() {
  return (
    <div className="w-16 bg-teal-600 flex flex-col items-center py-4 space-y-4">
      {sidebarItems.map((item, index) => (
        <Button
          key={index}
          variant={item.active ? "secondary" : "ghost"}
          size="sm"
          className={`w-12 h-12 p-0 flex flex-col items-center justify-center text-xs ${
            item.active ? "bg-white text-teal-600" : "text-white hover:bg-teal-700"
          }`}
        >
          <item.icon className="w-5 h-5 mb-1" />
          <span className="text-[10px] leading-none text-center">
            {item.label.split(" ").map((word, i) => (
              <div key={i}>{word}</div>
            ))}
          </span>
        </Button>
      ))}
    </div>
  )
}
