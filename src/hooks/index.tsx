import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';

interface Props {
  children: ReactNode;
}

function AppProvider({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProvider;
