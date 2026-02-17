import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import YouTube from './pages/YouTube';
import Udemy from './pages/Udemy';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/udemy" element={<Udemy />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
      </div>

      <style jsx>{`
        .not-found {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .not-found-content {
          text-align: center;
          max-width: 600px;
        }

        .not-found-content h1 {
          font-size: 8rem;
          margin-bottom: var(--spacing-md);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .not-found-content h2 {
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-sm);
        }

        .not-found-content p {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-xl);
        }
      `}</style>
    </div>
  );
}

export default App;
