import React from "react";

import { PrimeReactProvider } from "primereact/api";
import { AppRoute } from "./app.route";
import { styleExtension } from "./style/tailwind-extension";

function App() {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: styleExtension }}>
      <AppRoute />
    </PrimeReactProvider>
  );
}

export default App;
