import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '@/provider/AuthProvider/AuthProvider';
import { SplashProvider } from '@/provider/SplashProvider';
import { Navigation } from '@/router';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';

const queryClient = new QueryClient();

const App: FC = () => (
  <SplashProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </SplashProvider>
);

export default App;
