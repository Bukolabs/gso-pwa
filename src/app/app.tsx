import React from "react";

import { PrimeReactProvider } from "primereact/api";
import { AppRoute } from "./app.route";
import { QueryClient, QueryClientProvider } from "react-query";

// Use this when you want to override to default tailwind setup
// Downside is the forms aren't styled to tailwind setup yet
import { styleExtension } from "./style/tailwind-extension";
import { NotificationProvider } from "@shared/ui/notification/notification.context";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
  const key = "6LfrMG4pAAAAAHQSAjaIyauCXlG3wKvP1q8NmVhO";
  // window.recaptchaOptions = {
  //   useRecaptchaNet: true,
  //   enterprise: true,
  // };
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
        <NotificationProvider>
          <GoogleReCaptchaProvider reCaptchaKey={key}>
            <AppRoute />
          </GoogleReCaptchaProvider>
        </NotificationProvider>
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}

export default App;
