import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/fonts/JetBrains.css";
import "./index.css";
import Index from "./routes/Index.tsx";
import Add from "./routes/Add.tsx";
import { Routes, Route, BrowserRouter } from "react-router";
import All from "./routes/All.tsx";
import Text from "./routes/Text.tsx";
import Footer from "./shared/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex flex-col h-[100dvh]">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/add" element={<Add />} />
          <Route path="/all" element={<All />} />
          <Route path="/text" element={<Text />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
);
