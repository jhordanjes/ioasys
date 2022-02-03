// Integração com o backend, lógica para refresh token e
// fila para requisições com token desatualizado.

import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../hooks/auth';
import { RedirectError } from './errors/RedirectError';

const baseURL = process.env.NEXT_PUBLIC_ENDPOINT;

const isRefreshing = false;
const failedRequestQueue: Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}> = [];

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${cookies['@ioasys:token']}`,
    },
  });

  api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data.errors.message === 'Não autorizado.') {
          // cookies = parseCookies(ctx);
          // const {
          //   // '@ioasys:token': token,
          //   '@ioasys:refreshToken': refreshToken,
          // } = cookies;
          // const originalConfig = error.config;
          // if (!isRefreshing) {
          //   isRefreshing = true;
          //   api
          //     .post('/auth/refresh-token', {
          //       refreshToken,
          //     })
          //     .then(response => {
          //       const refreshTokenUpdate = response.headers['refresh-token'];
          //       const tokenUpdate = response.headers.authorization;
          //       setCookie(ctx, '@ioasys:token', tokenUpdate, {
          //         maxAge: 60 * 60 * 24,
          //         path: '/',
          //       });
          //       setCookie(ctx, '@ioasys:refreshToken', refreshTokenUpdate, {
          //         maxAge: 60 * 60 * 24,
          //         path: '/',
          //       });
          //       api.interceptors.request.use(config => {
          //         if (config.headers) {
          //           config.headers.Authorization = `Bearer ${tokenUpdate}`;
          //         }
          //         return config;
          //       });
          //       failedRequestQueue.forEach(request =>
          //         request.onSuccess(tokenUpdate),
          //       );
          //       failedRequestQueue = [];
          //     })
          //     .catch(err => {
          //       failedRequestQueue.forEach(request => request.onFailure(err));
          //       failedRequestQueue = [];
          //       if (process.browser) {
          //         signOut();
          //       } else {
          //         Promise.reject(new RedirectError());
          //       }
          //     })
          //     .finally(() => {
          //       isRefreshing = false;
          //     });
          // }
          // return new Promise((resolve, reject) => {
          //   failedRequestQueue.push({
          //     onSuccess: (token: string) => {
          //       if (originalConfig.headers) {
          //         originalConfig.headers.Authorization = `Bearer ${token}`;
          //       }
          //       resolve(api(originalConfig));
          //     },
          //     onFailure: (err: AxiosError) => {
          //       reject(err);
          //     },
          //   });
          // });

          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new RedirectError());
          }
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
}
