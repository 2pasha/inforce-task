export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  productId: number;
  description: string;
  date: string;
}

export interface FormErrors {
  name?: string;
  count?: string;
  width?: string;
  height?: string;
  weight?: string;
}
