import React from "react";

import { PrimeReactProvider } from "primereact/api";
import { AppRoute } from "./app.route";
import { QueryClient, QueryClientProvider } from "react-query";

// Use this when you want to override to default tailwind setup
// Downside is the forms aren't styled to tailwind setup yet
import { styleExtension } from "./style/tailwind-extension";
import { NotificationProvider } from "@shared/ui/notification/notification.context";

declare global {
  interface Window {
    recaptchaOptions: any;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
        <NotificationProvider>
          <AppRoute />
        </NotificationProvider>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
