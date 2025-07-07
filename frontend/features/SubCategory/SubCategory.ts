import { Document } from "../document/Document";

export default interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  _count?: {
    documents: number; // Count of documents in this sub-category
  };
  documents: Document[]; // Array of document IDs
}