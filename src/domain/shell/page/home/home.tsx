import { Button } from "primereact/button";
import "./home";

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home() {
  return (
    <div className="home">
      <h1>Welcome to, Home</h1>

      <Button icon="pi pi-check" />
      <Button label="Submit" icon="pi pi-check" />
      <Button label="Submit" icon="pi pi-check" iconPos="right" />
    </div>
  );
}

export default Home;
