import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Frame } from "./screens/Frame";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("app") as HTMLElement).render(
<StrictMode>
    <BrowserRouter>
      <Frame />
    </BrowserRouter>
  </StrictMode>,
);
