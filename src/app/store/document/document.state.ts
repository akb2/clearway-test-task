import { DocumentItem, DocumentItemSnippet } from "@app/models/document";

export const DOCUMENT_KEY = "document";
export const DOCUMENT_SNIPPETS_LOCAL_STORAGE_KEY = "document-snippets";

export interface DocumentState {
  documents: DocumentItem[];
  snippets: DocumentItemSnippet[];
}

export const documentInitialState: DocumentState = {
  documents: [],
  snippets: []
};
