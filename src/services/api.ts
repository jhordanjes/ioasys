// import axios, { AxiosError } from 'axios';
// import { parseCookies } from 'nookies';
// import { signOut } from '../hooks/auth';
// import { RedirectError } from './errors/RedirectError';

// const baseURL = process.env.NEXT_PUBLIC_ENDPOINT;

// export function setupAPIClient(ctx = undefined) {
//   const cookies = parseCookies(ctx);

//   const api = axios.create({
//     baseURL,
//     headers: {
//       Authorization: `Bearer ${cookies['@ioasys:token']}`,
//     },
//   });

//   api.interceptors.response.use(
//     response => response,
//     (error: AxiosError) => {
//       if (
//         error.response?.status === 401 &&
//         error.response.data?.message ===
//           'E_UNAUTHORIZED_ACCESS: Unauthorized access'
//       ) {
//         if (process.browser) {
//           signOut();
//           // destroyCookie(undefined, '@PortalShapePerfeito:token');
//           // destroyCookie(undefined, '@PortalShapePerfeito:user');
//           // delete api.defaults.headers.Authorization;
//           // window.location.reload();
//         } else {
//           return Promise.reject(new RedirectError());
//         }
//       }
//       return Promise.reject(error);
//     },
//   );

//   return api;
// }

import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../hooks/auth';
import { RedirectError } from './errors/RedirectError';

const baseURL = process.env.NEXT_PUBLIC_ENDPOINT;

let isRefreshing = false;
let failedRequestQueue: Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}> = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

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
          cookies = parseCookies(ctx);
          const {
            // '@ioasys:token': token,
            '@ioasys:refreshToken': refreshToken,
          } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            api
              .post('/auth/refresh-token', {
                refreshToken,
              })
              .then(response => {
                const refreshTokenUpdate = response.headers['refresh-token'];
                const tokenUpdate = response.headers.authorization;

                setCookie(ctx, '@ioasys:token', tokenUpdate, {
                  maxAge: 60 * 60 * 24,
                  path: '/',
                });

                setCookie(ctx, '@ioasys:refreshToken', refreshTokenUpdate, {
                  maxAge: 60 * 60 * 24,
                  path: '/',
                });

                api.interceptors.request.use(config => {
                  if (config.headers) {
                    config.headers.Authorization = `Bearer ${tokenUpdate}`;
                  }
                  return config;
                });

                failedRequestQueue.forEach(request =>
                  request.onSuccess(tokenUpdate),
                );

                failedRequestQueue = [];
              })
              .catch(err => {
                failedRequestQueue.forEach(request => request.onFailure(err));
                failedRequestQueue = [];
                if (process.browser) {
                  signOut();
                } else {
                  Promise.reject(new RedirectError());
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                if (originalConfig.headers) {
                  originalConfig.headers.Authorization = `Bearer ${token}`;
                }
                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }
        if (process.browser) {
          signOut();
        } else {
          return Promise.reject(new RedirectError());
        }
      }
      return Promise.reject(error);
    },
  );

  return api;
}
