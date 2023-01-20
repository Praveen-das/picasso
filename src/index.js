import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import FirebaseContext from './Context/FirebaseContext';
import HelperContext from "./Context/HelperContext";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HelperContext>
        <App />
      </HelperContext>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
