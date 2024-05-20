import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useQueryClient } from 'react-query';

import { api } from 'services/api';
import { setAuthorizationHeader } from 'services/api/interceptors';
import { createTokenCookies, getToken, removeTokenCookies } from 'utils/tokenCookies';

import { useLocale } from 'hooks/useLocale';

import {
  User,
  LoginForm,
  RegisterForm,
  RecoverForm,
  ActivateForm,
  ActivateResponse,
  RegisterResponse,
  RecoverResponse,
  EmailUpdateForm,
  EmailUpdateResponse,
  PasswordUpdateForm,
  PasswordUpdateResponse
} from '../types/auth';

export interface AuthContextType {
  loading?: boolean;
  isLoggingIn?: boolean;
  user: User | null;
  login: (payload: LoginForm) => Promise<void>;
  logout: () => Promise<void>;
  restore: (token: string | null) => Promise<void>;
  register: (payload: RegisterForm) => Promise<RegisterResponse>;
  recover: (payload: RecoverForm) => Promise<RecoverResponse>;
  activate: (payload: ActivateForm) => Promise<ActivateResponse>;
  emailUpdate: (payload: EmailUpdateForm) => Promise<EmailUpdateResponse>;
  passwordUpdate: (payload: PasswordUpdateForm) => Promise<PasswordUpdateResponse>;
  setUser: (user: User | null) => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = React.createContext<AuthContextType>(undefined!);

function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();

  // const token = getToken();
  const [user, setActualUser] = useState<User|null>(null);

  const { setLocale } = useLocale();

  const setUser = (user: User|null) => {
    setActualUser(user);
    if(!user) {
      return;
    }
    setLocale(user.language || 'en');
  };

  const actions = useMemo(() => ({
    login: async ({ email, password }: LoginForm) => {
      const response = await api.post('auth/login', { email, password });
      const { token, refreshToken } = response.data;

      createTokenCookies(token, refreshToken || token);
      setAuthorizationHeader(api.defaults, token);

      const userResponse = await api.get('user/me');
      setUser(userResponse.data.data);
    },
    logout: async () => {
      setLoading(true);

      try {
        api.post('auth/logout');
      } catch(error) {
        // nothing here
      }

      removeTokenCookies();
      setUser(null);
      queryClient.clear();
      setLoading(false);
    },
    register: async (payload: RegisterForm) => {
        await api.post('auth/register', payload);
        return {};
    },
    activate: async (payload: ActivateForm) => {
      await api.post('auth/activate', payload);
      return {};
    },
    emailUpdate: async (payload: EmailUpdateForm) => {
      await api.post('auth/email-update', payload);
      return {};
    },
    recover: async (payload: RecoverForm) => {
      await api.post('auth/recover', payload);
      return {};
    },
    passwordUpdate: async (payload: PasswordUpdateForm) => {
      await api.post('auth/password-update', payload);
      return {};
    },
    restore: async (token: string | null) => {
      if(!token) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        setAuthorizationHeader(api.defaults, token);

        const response = await api.get('user/me');
        setUser(response.data.data);
      } catch(error) {
        removeTokenCookies();
        setUser(null);
        queryClient.clear();
      }

      setLoading(false);
    },
    setUser: async (user: User | null) => {
      setUser(user);
    }
  }), []);

  const value = {
      loading,
      user,
      ...actions
  };

  const didInitialise = useRef(false);

  useEffect(() => {
    if (didInitialise.current) {
      return;
    }
    didInitialise.current = true;

    actions.restore(getToken());
  }, [actions]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// function AuthStateConsumer({ children }: Props) {
//  return (
//    <AuthContext.Consumer>
//      {(context) => {
//        if(context === undefined) {
//          throw new Error('AuthStateConsumer must be used within a AuthProvider');
//        }
//        return children(context);
//      }}
//    </AuthContext.Consumer>
//  );
// }

export { AuthContext, AuthProvider };
