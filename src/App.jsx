import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";

// Lazy load below-fold components
const Features = lazy(() => import("./components/Features"));
const TargetAudience = lazy(() => import("./components/TargetAudience"));
const DemoPreview = lazy(() => import("./components/DemoPreview"));
const Pricing = lazy(() => import("./components/Pricing"));
const FAQ = lazy(() => import("./components/FAQ"));
const Footer = lazy(() => import("./components/Footer"));
const DemoModal = lazy(() => import("./components/DemoModal"));
const Tutorial = lazy(() => import("./pages/Tutorial"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(
    location.pathname === "/demo"
  );
  const [language, setLanguage] = useState("uz");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // Scroll to top button visibility
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // /demo route uchun: tashqaridan link orqali kirganda modal avtomatik ochiladi
  useEffect(() => {
    if (location.pathname === "/demo") {
      setIsDemoModalOpen(true);
    }
  }, [location.pathname]);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    // /demo dan yopilsa asosiy sahifaga qaytadi
    if (location.pathname === "/demo") {
      navigate("/", { replace: true });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                language={language}
                setLanguage={setLanguage}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                openDemoModal={openDemoModal}
              />
              <main>
                <Hero language={language} openDemoModal={openDemoModal} />
                <Suspense fallback={null}>
                  <Features language={language} openDemoModal={openDemoModal} />
                  <TargetAudience language={language} />
                  <DemoPreview language={language} />
                  <Pricing language={language} openDemoModal={openDemoModal} />
                  <FAQ language={language} />
                </Suspense>
              </main>
              <Suspense fallback={null}>
                <Footer language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} />
              </Suspense>
            </>
          }
        />
        {/* /demo — asosiy sahifa + modal avtomatik ochiq */}
        <Route
          path="/demo"
          element={
            <>
              <Header
                language={language}
                setLanguage={setLanguage}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                openDemoModal={openDemoModal}
              />
              <main>
                <Hero language={language} openDemoModal={openDemoModal} />
                <Suspense fallback={null}>
                  <Features language={language} openDemoModal={openDemoModal} />
                  <TargetAudience language={language} />
                  <DemoPreview language={language} />
                  <Pricing language={language} openDemoModal={openDemoModal} />
                  <FAQ language={language} />
                </Suspense>
              </main>
              <Suspense fallback={null}>
                <Footer language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} />
              </Suspense>
            </>
          }
        />
        <Route
          path="/tutorial/*"
          element={
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            }>
              <Tutorial
                language={language}
                setLanguage={setLanguage}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={null}>
              <TermsOfService language={language} isDarkMode={isDarkMode} />
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense fallback={null}>
              <PrivacyPolicy language={language} isDarkMode={isDarkMode} />
            </Suspense>
          }
        />
      </Routes>

      {isDemoModalOpen && (
        <Suspense fallback={null}>
          <DemoModal
            isOpen={isDemoModalOpen}
            onClose={closeDemoModal}
            language={language}
          />
        </Suspense>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover-lift"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default App;
