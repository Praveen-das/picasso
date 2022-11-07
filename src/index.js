import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import FirebaseContext from './Context/FirebaseContext';
import HelperContext from "./Context/HelperContext";

const client = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 300000 },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <HelperContext>
        <App />
      </HelperContext>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
