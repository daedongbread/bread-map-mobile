import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/provider/AuthProvider/AuthProvider';
import { SplashProvider } from '@/provider/SplashProvider';
import { Navigation } from '@/router';
import rootReducer from '@/slices';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});
const queryClient = new QueryClient();

const App: FC = () => (
  <SplashProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </SplashProvider>
);

export default App;
