import axios from 'axios';
import { useEffect, useState } from 'react';

export function useFetch(url?: string, opts?: any) {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (!url) return;
    setLoading(true);

    axios({
      method: opts.method,
      url,
      headers: opts.headers,
      data: opts.data
    })
    .then((res) => {
      setResponse(res.data);
      setLoading(false);
    })
/*
    fetch(url, opts)
      .then((res) => res.json())
      .then((res) => {
        setResponse(res);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
      */
  }, [url, opts?.data]);

  return [response, loading, hasError];
}
