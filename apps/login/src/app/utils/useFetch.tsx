import { useEffect, useState } from "react";

export function useFetch(url?: string, opts?: any) {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (!url) return;
    setLoading(true);
    fetch(url, opts)
      .then(res => res.json())
      .then((res) => {
      setResponse(res);
      setLoading(false);
    })
    .catch(() => {
      setHasError(true);
      setLoading(false);
    });
  }, [url])

  return [response, loading, hasError];
}
