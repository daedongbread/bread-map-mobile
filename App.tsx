import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from '@/provider/AuthProvider/AuthProvider';
import { SplashProvider } from '@/provider/SplashProvider';
import rootReducer from '@/slices';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { configureStore } from '@reduxjs/toolkit';
import { RootNavigation } from './src/pages/Stack';

const store = configureStore({
  reducer: rootReducer,
});

const queryClient = new QueryClient();

const App: FC = () => (
  <SplashProvider>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <RootNavigation />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  </SplashProvider>
);

export default App;
