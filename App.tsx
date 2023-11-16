import React, { FC } from 'react';
import CodePush from 'react-native-code-push';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from '@/provider/AuthProvider/AuthProvider';
import { NotificationProvider } from '@/provider/NotificationProvider';
import { SplashProvider } from '@/provider/SplashProvider';
import { ToastProvider } from '@/provider/ToastProvider/ToastProvider';
import store from '@/slices';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { RootNavigation } from './src/pages/Stack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      retry: false,
    },
  },
});

const App: FC = () => (
  <SplashProvider>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <NotificationProvider>
              <AuthProvider>
                <RootNavigation />
              </AuthProvider>
            </NotificationProvider>
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  </SplashProvider>
);

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  rollbackRetryOptions: {
    maxRetryAttempts: 3,
  },
};

export default CodePush(codePushOptions)(App);
