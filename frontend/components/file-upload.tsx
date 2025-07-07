"use client";

import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile } from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

interface FileUploadProps {
  subCategoryId: string | null;
  onUploadSuccess: () => void; // callback après upload réussi
}

export function FileUpload({ subCategoryId, onUploadSuccess }: FileUploadProps) {
  const [files, setFiles] = useState<any[]>([]);

  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    setFiles(fileItems);
  };

  if (!subCategoryId) {
    return <p className="p-4 text-gray-500">Sélectionnez une sous-catégorie pour uploader</p>;
  }

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <div className="max-w-2xl">
        <FilePond
        name="file"
          files={files}
          onupdatefiles={handleUpdateFiles}
          allowMultiple={true}
          maxFiles={10}
          maxFileSize="40MB"
          acceptedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
          labelIdle='Glissez & déposez vos documents ou <span class="filepond--label-action">cliquez pour choisir</span><br><small>Fichiers acceptés : JPG, PNG et PDF. Maximum taille 40Mo</small>'
          server={{
            url: "http://localhost:5000", 
            process: {
              url: "/documents",
              method: "POST",
              withCredentials: false,
              headers: {},
              onload: (response) => {
                onUploadSuccess(); // rafraîchir la liste après upload reload mta3ha
                return response; 
              },
              onerror: (res) => {
                console.error("Erreur upload:", res);
              },
              // ondata pour ajouter subCategoryId dans le body multipart
              //5ater fama relation one to many entre subCategory et documents
              ondata: (formData) => {
                formData.append("subCategoryId", subCategoryId);
                return formData;
              },
            },
          }}
        />
      </div>
    </div>
  );
}
