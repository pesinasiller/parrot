import Product from './Product.types';

export default interface ProductsByCategory {
  [key: string]: {
    categoryName: string;
    products: Product[];
  };
}
