import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/fonts/JetBrains.css";
import "./index.css";
import Index from "./routes/Index.tsx";
import Add from "./routes/Add.tsx";
import { Routes, Route, BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
