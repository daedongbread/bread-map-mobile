import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '@/provider/AuthProvider/AuthProvider';
import { SplashProvider } from '@/provider/SplashProvider';
import { Navigation } from '@/router';
import { theme } from '@/styles/theme';
import { bakeryMenu, reviews, info } from '@/utils/tempData';
import { ThemeProvider } from '@emotion/react';

const queryClient = new QueryClient();

const App: FC = () => (
  <SplashProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Navigation data={{ bakeryMenu, reviews, info }} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </SplashProvider>
);

export default App;
