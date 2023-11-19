import React from "react";

import { PrimeReactProvider } from "primereact/api";
import { AppRoute } from "./app.route";
import { QueryClient, QueryClientProvider } from "react-query";

// Use this when you want to override to default tailwind setup
// Downside is the forms aren't styled to tailwind setup yet
import { styleExtension } from "./style/tailwind-extension";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
        <AppRoute />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
