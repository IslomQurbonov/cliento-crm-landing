import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import TargetAudience from "./components/TargetAudience";
import DemoPreview from "./components/DemoPreview";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import DemoModal from "./components/DemoModal";

function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [language, setLanguage] = useState("uz");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        openDemoModal={openDemoModal}
      />

      <main>
        <Hero language={language} openDemoModal={openDemoModal} />
        <Features language={language} />
        <TargetAudience language={language} />
        <DemoPreview language={language} />
        <Pricing language={language} />
        <FAQ language={language} />
      </main>

      <Footer language={language} setLanguage={setLanguage} />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={closeDemoModal}
        language={language}
      />
    </div>
  );
}

export default App;
