import { useState } from 'react';

const useApi = (apiFunc: (...rest: any[]) => any) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok && (response.data.error || 'Something went wrong'));
    setData(response.data);
    return response;
  };

  return { data, error, loading, request };
};

export default useApi;
