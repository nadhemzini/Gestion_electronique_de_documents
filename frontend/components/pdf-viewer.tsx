"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCw, Download, Printer, MoreHorizontal, ExternalLink } from "lucide-react"
import Image from "next/image"

interface PdfViewerProps {
  selectedDocument: string | null
}

export function PdfViewer({ selectedDocument }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 1

  if (!selectedDocument) {
    return (
      <div className="h-full bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Sélectionnez un document pour le visualiser</p>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      <div className="bg-gray-800 p-2 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <Printer className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white rounded shadow-lg max-w-full mx-auto">
          <Image src="/portrait.png" alt="Document preview" width={300} height={400} className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}
