import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const isAuth = () => {
  return localStorage.getItem("accessToken") && localStorage.getItem("refreshToken");
};

export const getToken = () => {
  return isAuth() ? localStorage.getItem("accessToken") : "";
};

export const getRefreshToken = () => {
  return isAuth() ? localStorage.getItem("refreshToken") : "";
};

export const setTokens = (token: string, refresh: string) => {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("refreshToken", refresh);
};

export const createInterceptors = () => {
  const axiosRefresh = axios.create();
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && getRefreshToken()) {
      return axiosRefresh({
          method: 'post',
          url: `${process.env.NX_BASE_URL}/api/auth/token/refresh`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            refresh: JSON.parse(getRefreshToken() as string)
          }
        })
        .then((responseData) => {
          console.log("responseData",responseData);
          const access = JSON.stringify(responseData.data.access);
          const refresh = JSON.stringify(responseData.data.refresh)
          setTokens(access, refresh);
          axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(access)}`;
          originalRequest.headers['Authorization'] = `Bearer ${JSON.parse(access)}`;
          return axios(originalRequest);
        }).catch((error) => {
          console.log(error);
          setTokens("", "");
          return <Redirect push to="/login" />
        });
    }
    return Promise.reject(error);
  });
}
