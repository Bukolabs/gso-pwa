import React from "react";

import { PrimeReactProvider } from "primereact/api";
import { AppRoute } from "./app.route";

// Use this when you want to override to default tailwind setup
// Downside is the forms aren't styled to tailwind setup yet
import { styleExtension } from "./style/tailwind-extension";

function App() {
  return (
    <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
      <AppRoute />
    </PrimeReactProvider>
  );
}

export default App;
