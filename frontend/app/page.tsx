"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DocumentTree } from "@/components/document-tree"
import { DocumentList } from "@/components/document-list"
import { PdfViewer } from "@/components/pdf-viewer"
import { FileUpload } from "@/components/file-upload"
import { Header } from "@/components/header"

export default function DocumentManagement() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0); // juste un compteur pour forcer reload

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <DocumentTree
              selectedCategory={selectedCategory ?? ""}
              onCategorySelect={setSelectedCategory}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <DocumentList
              category={selectedCategory}
              onDocumentSelect={setSelectedDocument}
              key={refreshFlag} // reset la liste à chaque upload réussi
            />
            <FileUpload
              subCategoryId={selectedCategory}
              onUploadSuccess={() => setRefreshFlag((v) => v + 1)}
            />
          </div>
          <div className="w-96 bg-gray-900">
            <PdfViewer selectedDocument={selectedDocument} />
          </div>
        </div>
      </div>
    </div>
  );
}

