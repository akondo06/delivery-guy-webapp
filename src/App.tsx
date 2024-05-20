import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';

import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

import { AuthProvider } from './providers/auth';

import Routes from './Routes';
import Spinner from 'components/Spinner';
import { LocaleProvider } from 'providers/locale';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: 1
      retry: 0,
      staleTime: 1000 * 60 * 1
    }
  }
});

function App() {
  return (
    <LocaleProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Suspense fallback={<Spinner size="xl" />}>
              <Routes />
          </Suspense>
          <ToastContainer
            theme="colored"
            position="bottom-left"
            hideProgressBar
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </LocaleProvider>
  );
}

export default App;
