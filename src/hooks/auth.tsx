import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apliClient';
import { IUser } from '../interfaces/IUser';

interface AuthState {
  token: string;
  refreshToken: string;
  user: IUser;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextInterface {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  user: IUser;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
);

export const signOut = () => {
  destroyCookie({}, '@ioasys:token', {
    path: '/',
  });
  destroyCookie({}, '@ioasys:user', {
    path: '/',
  });
  destroyCookie({}, '@ioasys:refreshToken', {
    path: '/',
  });
  Router.push('/');
};

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [data, setData] = useState<AuthState>(() => {
    const {
      '@ioasys:user': user,
      '@ioasys:token': token,
      '@ioasys:refreshToken': refreshToken,
    } = parseCookies();
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    if (token && user) {
      return { token, user: JSON.parse(user), refreshToken };
    }
    delete api.defaults.headers.common.Authorization;

    return {} as AuthState;
  });
  const isAuthenticated = !!data;

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth/sign-in', {
      email,
      password,
    });
    const { headers, data: dataApi } = response;

    api.interceptors.request.use(config => {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${headers.authorization}`;
      }
      return config;
    });

    setCookie({}, '@ioasys:token', headers.authorization, {
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    setCookie({}, '@ioasys:refreshToken', headers['refresh-token'], {
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    setCookie({}, '@ioasys:user', JSON.stringify(dataApi), {
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    setData({
      token: headers.authorization,
      user: dataApi,
      refreshToken: headers['refresh-token'],
    });
  }, []);

  const values = useMemo(() => {
    return {
      signIn,
      isAuthenticated,
      user: data.user,
      signOut: () => {
        setData({} as AuthState);
        signOut();
      },
    };
  }, [isAuthenticated, signIn, data.user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextInterface {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used withn an AuthProvider');
  }

  return context;
}
