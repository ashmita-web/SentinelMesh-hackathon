import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Home from "./pages/Home";
import DemoConsole from "./pages/DemoConsole";
import DigitalTwin from "./pages/DigitalTwin";
import Anomalies from "./pages/Anomalies";
import Federation from "./pages/Federation";
import Trust from "./pages/Trust";
import Audit from "./pages/Audit";
import Docs from "./pages/Docs";
import DocsCriteria from "./pages/DocsCriteria";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="sentinel-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo" element={<DemoConsole />} />
                <Route path="/twin" element={<DigitalTwin />} />
                <Route path="/anomalies" element={<Anomalies />} />
                <Route path="/federation" element={<Federation />} />
                <Route path="/trust" element={<Trust />} />
                <Route path="/audit" element={<Audit />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/docs/criteria" element={<DocsCriteria />} />
                <Route path="/about" element={<About />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;