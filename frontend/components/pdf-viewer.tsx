"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";

interface PdfViewerProps {
  selectedDocument: string | null;   // this should be a full URL
}

export function PdfViewer({ selectedDocument }: PdfViewerProps) {
  const [currentPage] = useState(1); // not used yet
  const totalPages = 1;
const url = `http://localhost:5000/uploads/${selectedDocument}`;
  if (!selectedDocument) {
    return (
      <div className="h-full bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400">Sélectionnez un document pour le visualiser</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* toolbar omitted for brevity */}

      <div className="flex-1 overflow-auto">
        <iframe
          src={`${url}#toolbar=0&navpanes=0`}
          title="Document PDF"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
