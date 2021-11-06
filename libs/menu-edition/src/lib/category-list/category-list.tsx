import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductDescription from '../product-description/product-description';
import { useFetch } from '../hooks/useFetch';
import Product from '../types/Product.types';
import ProductsByCategory from '../types/ProductsByCategory.types';
import './category-list.scss';

interface CategoryListProps {
  storeId: string;
}

const groupByCategory = (productsArray: any) =>
  productsArray.reduce((arr: ProductsByCategory, product: Product) => {
    arr[product.category.uuid] = arr[product.category.uuid] || {
      categoryName: product.category.name,
      products: [],
    };
    arr[product.category.uuid].products.push(product);
    return arr;
  }, {});

const CategoryList = ({ storeId }: CategoryListProps) => {
  const { token } = useSelector((state: RootStateOrAny) => state);
  const [request, setRequest] = useState<{ url?: string; opts?: any }>();
  const [response, loading, hasError] = useFetch(request?.url, request?.opts);

  useEffect(() => {
    if (!token) return;
    setRequest({
      url: `${process.env.NX_BASE_URL}/api/v1/products/?store=${storeId}`,
      opts: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${JSON.parse(token)}`,
        },
      }
    });

  },[token]);

  const prod = response?.results || [];
  const groupedByCategory = groupByCategory(prod);

  const renderProductDescriptions = (products: Product[]) =>
    products.map((product: Product) => (
      <ProductDescription product={product} key={product.uuid} />
    ));

  const renderCategories = Object.keys(groupedByCategory).map((key: string) => (
    <Accordion key={key}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{`${groupedByCategory[key].categoryName} (${groupedByCategory[key].products.length})`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {renderProductDescriptions(groupedByCategory[key].products)}
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <div className="category-list">
      {loading ? <CircularProgress /> : renderCategories}
    </div>
  );
};

export default CategoryList;
