import { reduxStore, persistor } from '@/redux';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import {
    QueryClient,
    QueryClientProvider,
    QueryCache
} from '@tanstack/react-query'


const queryCache = new QueryCache({
    onError: (error, query) => {
        if (error instanceof Error) console.error({ key: query.queryKey, error: error.message });
    },
});
const queryClient = new QueryClient({
    queryCache,
    defaultOptions: {
    queries: {
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: "all",
    retry:3,
    },
},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
        {children}     
        </QueryClientProvider>
    </PersistGate>
  </Provider>
}
