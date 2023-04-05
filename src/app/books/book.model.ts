export interface Book {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  thumbnail?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  user?: string;
  totalPages?: number;
  pagesRead?: number;
  status?: string;
  notes?: string;
  lastUpdated?: Date;
  finishedDate?: Date;
}
