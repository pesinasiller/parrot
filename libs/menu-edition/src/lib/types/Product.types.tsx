export default interface Product {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  legacyId: string;
  price: string;
  alcoholCount: number;
  soldAlone: boolean;
  availability: string;
  providerAvailability: string | null;
  category: {
    uuid: string;
    name: string;
    sortPosition: number;
  };
}
