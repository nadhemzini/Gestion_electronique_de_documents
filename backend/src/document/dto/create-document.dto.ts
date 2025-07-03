export class CreateDocumentDto {
  title: string;
  filePath: string;
  mimeType: string;
  subCategoryId: string;
  fileKey?: string; // optionnel côté client
  uploaderId: any;
}
