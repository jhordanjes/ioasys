export interface IBook {
  id: string;
  category: string;
  description: string;
  imageUrl?: string;
  isbn10: string;
  isbn13: string;
  language: string;
  pageCount: number;
  published: number;
  publisher: string;
  title: string;
  authors: string[];
}
