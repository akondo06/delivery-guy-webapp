import { AxiosDefaults, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { createTokenCookies, getRefreshToken, getToken, removeTokenCookies } from 'utils/tokenCookies';
import { api } from '.';

import transformPayloadProps from './payload.props.transform';

interface IFailedRequestQueue {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

interface AccessDenienPayload {
  code?: string;
}

let isRefreshing = false;
let failedRequestQueue: IFailedRequestQueue[] = [];

export function setAuthorizationHeader(request: AxiosDefaults | AxiosRequestConfig | any, token: string) {
  request.headers.Authorization = `Bearer ${token}`;
}

function handleRefreshToken(refreshToken: string) {
  isRefreshing = true;

  api.post('auth/refresh', { refreshToken }).then((response) => {
    const { token } = response.data;

    createTokenCookies(token, response.data.refreshToken);
    setAuthorizationHeader(api.defaults, token);

    failedRequestQueue.forEach((request) => request.onSuccess(token));
    failedRequestQueue = [];
  }).catch((error) => {
    failedRequestQueue.forEach((request) => request.onFailure(error));
    failedRequestQueue = [];

    removeTokenCookies();
  }).finally(() => {
    isRefreshing = false;
  });
}

function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
  const token = getToken();

  if (token) {
    setAuthorizationHeader(config, token);
  }

  config = transformPayloadProps(config);

  return config;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

function onResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

function onResponseError(error: AxiosError): Promise<AxiosError | AxiosResponse> {
  if (error?.response?.status === 401) {

    const data = error.response.data as AccessDenienPayload;

    if(data && data.code === 'token.expired') {
      const originalConfig = error.config;
      const refreshToken = getRefreshToken();

      !isRefreshing && handleRefreshToken(refreshToken);

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            setAuthorizationHeader(originalConfig, token);
            resolve(api(originalConfig));
          },
          onFailure: (error: AxiosError) => {
            reject(error);
          }
        })
      })
    } else {
      removeTokenCookies();
    }
  }

  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
