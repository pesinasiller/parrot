import { useState } from 'react';

export default function useToken() {
  const getAccessToken = () => {
    const tokenString = localStorage.getItem('accessToken') ?? "";
    const userToken = tokenString ? JSON.parse(tokenString) : null;
    return userToken;
  };

  const [accessToken, setAccessToken] = useState(getAccessToken());

  const storeAccessToken = (token: string, refresh: string) => {
    localStorage.setItem('accessToken', JSON.stringify(token));
    localStorage.setItem('refreshToken', JSON.stringify(refresh));
    setAccessToken(token);
  };

  return {
    setAccessToken: storeAccessToken,
    accessToken
  }
}
