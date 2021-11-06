import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import CategoryList from './category-list/category-list';
import { useFetch } from './hooks/useFetch';
import './menu-edition.scss';

export const MenuEdition = () => {
  const { token } = useSelector((state: RootStateOrAny) => state);
  const [request, setRequest] = useState<{ url?: string; opts?: any }>();
  const [response, loading, hasError] = useFetch(request?.url, request?.opts);

  useEffect(() => {
    if (!token) return;
    setRequest({
      url: `${process.env.NX_BASE_URL}/api/v1/users/me`,
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

  const stores = response?.result?.stores;
  return (
    <div className="store-container">
      {loading || !stores ? (
        <CircularProgress />
      ) : (
        stores.map((store: any) => (
          <div key={store.uuid}>
            <h1>{store.name}</h1>
            <CategoryList storeId={store.uuid} />
          </div>
        ))
      )}
    </div>
  );
};

export default MenuEdition;
