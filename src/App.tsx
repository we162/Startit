import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Companies from './pages/Companies';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          {/* Admin Route - Full Screen */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Public Routes - With Header/Footer */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;