'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Download,
  Trash2,
  Send,
  Eye,
  PanelsTopBottom,
  Scissors,
} from 'lucide-react';
import { deleteManyDocuments, deleteOneDocument, getDocsBySubCategory, mergeManyDocuments } from '@/features/document/api';
import { Document } from '@/features/document/Document';
import { getSubCategory } from '@/features/SubCategory/api';
import { downloadFile } from '@/features/document/download';

interface DocumentListProps {
  category: string | null;
  onDocumentSelect: (documentId: string | null) => void;
}

export function DocumentList({ category, onDocumentSelect }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
 // Effect to fetch documents when category changes
  // This effect fetches the documents for the selected sub-category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getSubCategory(category as string);
        console.log("Fetched the documents of Subcategories:", data.documents);
        setDocuments(data.documents);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (!category) {
      setDocuments([]);
      return;
    }

    setLoading(true);
    setError(null);
 // Fetch documents for the selected sub-category
    console.log("Fetching documents for category:", category);
    getDocsBySubCategory(category)
      .then((data) => {
        setDocuments(data);
        setSelectedDocs([]);
        setSelectAll(false);
      })
      .catch(() => setError('Impossible de charger les documents'))
      .finally(() => setLoading(false));

    fetchCategories();
  }, [category]);
  // Fetch documents when category changes
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedDocs(checked ? documents.map((d) => d.id) : []);
  };

  const handleSelectDoc = (id: string, checked: boolean) => {
    setSelectedDocs((prev) =>
      checked ? [...prev, id] : prev.filter((docId) => docId !== id)
    );
    if (!checked) setSelectAll(false);
  };
  const handleDeleteSelected = async () => {
  if (!selectedDocs.length) return;

  try {
    if (selectedDocs.length === 1) {
       await deleteOneDocument(selectedDocs[0]);
    } else {
       await deleteManyDocuments(selectedDocs);
    }
    
    // Refresh the document list after deletion
    const updatedDocs = documents.filter(doc => !selectedDocs.includes(doc.id));
    setDocuments(updatedDocs);
    setSelectedDocs([]);
    setSelectAll(false);

    // Show success toast
    toast({
      title: "✅ Suppression réussie",
      description: `${selectedDocs.length} document${selectedDocs.length > 1 ? 's' : ''} supprimé${selectedDocs.length > 1 ? 's' : ''} avec succès`,
      variant: "default",
      className: "border-green-200 bg-green-50 text-green-800 [&>div]:text-green-800",
    });
  } catch (err) {
    console.error("Erreur de suppression :", err);
    
    // Show error toast
    toast({
      title: "Erreur de suppression",
      description: "Une erreur s'est produite lors de la suppression des documents",
      variant: "destructive",
    });
  }
};

//------------------Merge documents----------------
    const handleMergeSelected = async () => {
  if (!selectedDocs.length) return;

  console.log("Selected documents for merge:", selectedDocs);
  try {
    
      const data =  await mergeManyDocuments(selectedDocs);
    console.log("Merge response data:", data);
    
    // Refresh the document list after Merge
    // const updatedDocs = documents.filter(doc => !selectedDocs.includes(doc.id));
    // setDocuments(updatedDocs);
    // setSelectedDocs([]);
    // setSelectAll(false);

    // Show success toast
    toast({
      title: "✅ fysionner réussie",
      variant: "default",
      className: "border-green-200 bg-green-50 text-green-800 [&>div]:text-green-800",
    });

  } catch (err) {
    console.error("Erreur de suppression :", err);
    
    // Show error toast
    toast({
      title: "Erreur de fusi",
      description: "Une erreur s'est produite lors de la fusion des documents",
      variant: "destructive",
    });
  }
};


  //------------------download----------------
  const handleDownloadSelected = () => {
  if (selectedDocs.length === 1) {
    // find fileKey of the doc
    const doc = documents.find(d => d.id === selectedDocs[0]);
    if (doc) downloadFile(doc.fileKey);
  } else if (selectedDocs.length > 1) {
    // download each file one by one (opens multiple tabs)
   selectedDocs.forEach(id => {
  const doc = documents.find(d => d.id === id);
  if (doc) downloadFile(doc.fileKey); // will open download for each file
});
  }
};









  const selCount = selectedDocs.length;
  const none = selCount === 0;
  const one = selCount === 1;
  const oneOrMany = selCount >= 1;
  const many = selCount > 1;

  return (
    <div className="flex-1 bg-white">
      <div className="bg-teal-600 text-white p-4">
        <h2 className="text-lg font-semibold">
          {category ? `Sous-catégorie ` : 'Aucune sous-catégorie'}
        </h2>
      </div>

      <div className="p-4">
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" disabled={!many} onClick={handleMergeSelected}>
                <PanelsTopBottom className="w-4 h-4 mr-2" />
                Fusionner PDF
              </Button>
              <Button variant="outline" size="sm" disabled={!one}>
                <Scissors className="w-4 h-4 mr-2" />
                Désassembler PDF
              </Button>
              <Button variant="outline" size="sm" disabled={!many}>
                <Send className="w-4 h-4 mr-2" />
                Envoyer PDF
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" size="sm" disabled={!oneOrMany} onClick={handleDownloadSelected}> 
              <Download className="w-4 h-4 mr-2" />
              Extraire PDF
            </Button>
            <Button variant="outline" size="sm" disabled={!oneOrMany}   onClick={handleDeleteSelected}
>
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer tous
            </Button>
            
          </div>
        </>

        {documents.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            Aucun document pour cette sous‑catégorie.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <Checkbox
                checked={selectAll}
                onCheckedChange={(c) => handleSelectAll(c as boolean)}
              />
              <span className="text-sm font-medium">Tout sélectionner</span>
            </div>

            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => onDocumentSelect(doc.fileKey)}
              >
                <Checkbox
                  checked={selectedDocs.includes(doc.id)}
                  onCheckedChange={(c) =>
                    handleSelectDoc(doc.id, c as boolean)
                  }
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <div className="text-sm text-blue-600 hover:underline">
                    {doc.title}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center space-x-4">
                    {/* Metadata could go here */}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-500 hover:text-orange-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDocumentSelect(doc.fileKey);
                  }}
                >
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
