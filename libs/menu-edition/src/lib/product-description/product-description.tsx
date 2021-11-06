import Product from '../types/Product.types';
import AvailabilitySwitch from '../availability-switch/availability-switch';
import './product-description.scss';

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => (
  <div className="product-description">
    <div
      className="product-description__image"
      style={{ backgroundImage: `url(${product.imageUrl})` }}
    ></div>
    <div className="product-description__info">
      <div className="product-description__name">{product.name}</div>
      <div className="product-description__price">{`$${product.price}`}</div>
    </div>
    <div className="product-description__available">
      <AvailabilitySwitch
        availability={product.availability === 'AVAILABLE'}
        productId={product.uuid}
      />
    </div>
  </div>
);

export default ProductDescription;
