import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

import SmoothScroll from "@/components/site/SmoothScroll";
import NoiseOverlay from "@/components/site/NoiseOverlay";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function ScrollManager() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) window.__lenis = lenis;
  }, [lenis]);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

function App() {
  return (
    <div className="App bg-obsidian min-h-screen">
      <BrowserRouter>
        <SmoothScroll>
          <NoiseOverlay />
          <ScrollManager />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </SmoothScroll>
      </BrowserRouter>
    </div>
  );
}

export default App;
