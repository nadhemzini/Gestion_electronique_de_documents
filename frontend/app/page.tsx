"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DocumentTree } from "@/components/document-tree"
import { DocumentList } from "@/components/document-list"
import { PdfViewer } from "@/components/pdf-viewer"
import { FileUpload } from "@/components/file-upload"
import { Header } from "@/components/header"

export default function DocumentManagement() {
  const [selectedCategory, setSelectedCategory] = useState("reglementation")
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <DocumentTree selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />
          </div>
          <div className="flex-1 flex flex-col">
            <DocumentList category={selectedCategory} onDocumentSelect={setSelectedDocument} />
            <FileUpload />
          </div>
          <div className="w-96 bg-gray-900">
            <PdfViewer selectedDocument={selectedDocument} />
          </div>
        </div>
      </div>
    </div>
  )
}
