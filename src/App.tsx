import React from "react";

import { PrimeReactProvider } from "primereact/api";
import { AppRoute } from "./app.route";

function App() {
  return (
    <PrimeReactProvider>
      <AppRoute />
    </PrimeReactProvider>
  );
}

export default App;
