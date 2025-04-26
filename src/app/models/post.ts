export interface Post {
    id?: number;
    title: string;
    content: string;
    author?: string;
    imageUrl?: string;
    category?: any;
    comments?: any[];
    createdAt?: string;
    updatedAt?: string;
  }