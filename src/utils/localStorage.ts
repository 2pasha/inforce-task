import { Product } from '../types';

const initialProducts: Product[] = [
  {
    id: 1738226516386,
    name: "Salamy Gold",
    imageUrl: "https://thumbs.dreamstime.com/b/%D0%BA%D1%83%D1%81%D0%BA%D0%B0-salamy-%D0%BD%D0%B0-%D0%B1%D0%B5-%D0%BE%D0%B9-%D0%BF%D1%80%D0%B5-%D0%BF%D0%BE%D1%81%D1%8B-%D0%BA%D0%B5-68964755.jpg",
    count: 2,
    size: {
      width: 120,
      height: 60
    },
    weight: 300,
    comments: [
      {
        id: 1738230466852,
        productId: 1738226516386,
        description: "nice!",
        date: "2025-01-30T09:47:46.852Z"
      }
    ]
  }
];

export const loadProducts = (): Product[] => {
  try {
    const products = localStorage.getItem('products');

    if (products) {
      return JSON.parse(products);
    }

    localStorage.setItem('products', JSON.stringify(initialProducts));

    return initialProducts;
  } catch (error) {
    console.error('error loading products from localStorage', error);
    return [];
  }
};

export const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem('products', JSON.stringify(products));
  } catch (error) {
    console.error('error saving products to localStorage', error);
  }
};
