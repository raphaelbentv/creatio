import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { Avantages } from '@/pages/Avantages';
import { About } from '@/pages/About';
import { Blog } from '@/pages/Blog';
import { Contact } from '@/pages/Contact';
import { Devis } from '@/pages/Devis';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/avantages" element={<Avantages />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/devis" element={<Devis />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
