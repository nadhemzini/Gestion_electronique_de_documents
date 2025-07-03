'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Send, Eye } from 'lucide-react';
import { getDocsBySubCategory } from '@/features/document/api';
import type { Document } from '../features/document/document';

interface DocumentListProps {
  /** ID de la sous‑catégorie sélectionnée (UUID) */
  category: string | null;
  onDocumentSelect: (documentId: string | null) => void;
}

export function DocumentList({ category, onDocumentSelect }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [selectAll, setSelectAll]       = useState(false);

  /* 🔄 Re-fetch when sub‑category changes */
  useEffect(() => {
    if (!category) {
      setDocuments([]);
      return;
    }
    setLoading(true);
    setError(null);

    getDocsBySubCategory(category)
      .then((data) => {
        setDocuments(data);
        setSelectedDocs([]);
        setSelectAll(false);
      })
      .catch(() => setError('Impossible de charger les documents'))
      .finally(() => setLoading(false));
  }, [category]);

  /* Sélection multiple */
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedDocs(checked ? documents.map((d) => d.id) : []);
  };
  const handleSelectDoc = (id: string, checked: boolean) => {
    setSelectedDocs((prev) =>
      checked ? [...prev, id] : prev.filter((docId) => docId !== id),
    );
    if (!checked) setSelectAll(false);
  };

  return (
    <div className="flex-1 bg-white">
      {/* Bandeau titre */}
      <div className="bg-teal-600 text-white p-4">
        <h2 className="text-lg font-semibold">
          {category ? `Sous‑catégorie  ` : 'Aucune sous‑catégorie'}
        </h2>
      </div>

      <div className="p-4">
        

        
          <>
            {/* ✨ Barres d’actions – affichées uniquement si la liste n’est pas vide */}
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Fusionner PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Désassembler PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer PDF
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Extraire PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer tous
                  </Button>
                </div>
              </>
            
            {/* Message si vide  */}
            {documents.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                Aucun document pour cette sous‑catégorie.
              </p>
            ) : (
              <div className="space-y-2">
                {/* Sélectionner tous */}
                <div className="flex items-center space-x-2 pb-2 border-b">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={(c) => handleSelectAll(c as boolean)}
                  />
                  <span className="text-sm font-medium">Tout sélectionner</span>
                </div>

                {/* Liste de documents */}
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => onDocumentSelect(doc.id)}
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
                        {/* <span>
                          {new Date(doc.createdAt).toLocaleString('fr-FR')}
                        </span>
                        {'size' in doc && doc.size && <span>{doc.size}</span>} */}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-500 hover:text-orange-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDocumentSelect(doc.id);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        
      </div>
    </div>
  );
}
