"use client"

import { useState } from "react"
import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"

import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
)

export function FileUpload() {
  const [files, setFiles] = useState([])

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      <div className="max-w-2xl">
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={10}
          maxFileSize="40MB"
          acceptedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
          labelIdle='Glissez & déposez vos documents ou <span class="filepond--label-action">cliquez pour choisir</span><br><small>Fichiers acceptés : JPG, PNG et PDF. Maximum taille 40Mo</small>'
          labelFileProcessing="Téléchargement en cours..."
          labelFileProcessingComplete="Téléchargement terminé"
          labelFileProcessingAborted="Téléchargement annulé"
          labelFileProcessingError="Erreur lors du téléchargement"
          labelTapToCancel="Appuyez pour annuler"
          labelTapToRetry="Appuyez pour réessayer"
          labelTapToUndo="Appuyez pour annuler"
          labelButtonRemoveItem="Supprimer"
          labelButtonAbortItemLoad="Annuler"
          labelButtonRetryItemLoad="Réessayer"
          labelButtonAbortItemProcessing="Annuler"
          labelButtonUndoItemProcessing="Annuler"
          labelButtonRetryItemProcessing="Réessayer"
          labelButtonProcessItem="Télécharger"
          className="filepond-custom"
        />
      </div>
    </div>
  )
}
