export enum DocumentEditTool {
  view,
  text,
  image
}

export enum DocumentItemType {
  text,
  image
}

export interface DocumentItem {
  id: number;
  name: string;
  imageUrl: string;
}

export interface DocumentItemSnippet {
  type: DocumentItemType;
  id: number;
  documentId: number;
  text?: string;
  imageUrl?: string;
  width: number;
  height: number;
  left: number;
  top: number;
}
