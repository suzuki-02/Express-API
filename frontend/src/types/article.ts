import { z } from 'zod';

export type Article = {
  _id: string;
  title: string;
  description?: string;
  content: string;
  userId: string;
  tags?: string[];
  isPublished: boolean;
  publishedOn?: string;
  createdAt: string;
  updatedAt: string;
};

// Zod schema for article form validation
export const articleFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  visibility: z.enum(['public', 'private'], {
    required_error: 'Select visibility',
  }),
});

export interface FetchArticlesParams {
  page?: number;
  limit?: number;
  q?: string;
  publishedOnly?: boolean;
}

export interface ArticlesMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  q?: string;
  publishedOnly: boolean;
}

export interface GetArticlesResponse {
  success: boolean;
  message: string;
  data: Article[];
  meta: ArticlesMeta;
}

export type ArticleFormData = z.infer<typeof articleFormSchema>;
