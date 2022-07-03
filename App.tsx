import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '@/provider/AuthProvider/AuthProvider';
import { SplashProvider } from '@/provider/SplashProvider';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { RootNavigation } from './src/pages/stack';

const queryClient = new QueryClient();

const App: FC = () => (
  <SplashProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </SplashProvider>
);

export default App;
