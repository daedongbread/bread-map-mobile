import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from '@/provider/AuthProvider/AuthProvider';
import { SplashProvider } from '@/provider/SplashProvider';
import { ToastProvider } from '@/provider/ToastProvider/ToastProvider';
import store from '@/slices';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { RootNavigation } from './src/pages/Stack';

const queryClient = new QueryClient();

const App: FC = () => (
  <SplashProvider>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <AuthProvider>
              <RootNavigation />
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  </SplashProvider>
);

export default App;
