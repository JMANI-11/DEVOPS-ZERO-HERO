import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Youtube, GraduationCap, Briefcase, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/youtube', label: 'YouTube', icon: Youtube },
        { path: '/udemy', label: 'Udemy', icon: GraduationCap },
        { path: '/projects', label: 'Projects', icon: Briefcase },
        { path: '/contact', label: 'Contact', icon: Mail },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="layout">
            {/* Header */}
            <header className="header">
                <nav className="container">
                    <div className="nav-wrapper">
                        <Link to="/" className="logo">
                            <span className="logo-text">DevOps</span>
                            <span className="logo-accent">Academy</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="nav-menu">
                            {navItems.map(({ path, label, icon: Icon }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`nav-link ${isActive(path) ? 'active' : ''}`}
                                    >
                                        <Icon size={18} />
                                        <span>{label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <ul className="mobile-nav animate-slide-down">
                            {navItems.map(({ path, label, icon: Icon }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`nav-link ${isActive(path) ? 'active' : ''}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Icon size={18} />
                                        <span>{label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main className="main-content">{children}</main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3 className="footer-title">DevOps Academy</h3>
                            <p className="footer-text">
                                Empowering developers with world-class DevOps and Cloud training.
                            </p>
                        </div>

                        <div className="footer-section">
                            <h4 className="footer-subtitle">Quick Links</h4>
                            <ul className="footer-links">
                                <li><Link to="/youtube">YouTube</Link></li>
                                <li><Link to="/udemy">Udemy Courses</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4 className="footer-subtitle">Connect</h4>
                            <div className="social-links">
                                <a
                                    href="https://youtube.com/@AbhishekVeeramalla"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                >
                                    <Youtube size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2024 DevOps Academy. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: var(--z-sticky);
          background: rgba(10, 14, 39, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 0;
        }

        .nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
        }

        .logo-text {
          color: var(--color-text-primary);
        }

        .logo-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-secondary);
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);
        }

        .nav-link:hover {
          color: var(--color-text-primary);
          background: var(--color-surface);
        }

        .nav-link.active {
          color: var(--color-accent-primary);
          background: rgba(99, 102, 241, 0.1);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--color-text-primary);
          cursor: pointer;
          padding: 0.5rem;
        }

        .mobile-nav {
          display: none;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          list-style: none;
        }

        .main-content {
          min-height: calc(100vh - 200px);
        }

        .footer {
          background: var(--color-bg-secondary);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: var(--spacing-xl) 0 var(--spacing-md);
          margin-top: var(--spacing-2xl);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-xl);
          margin-bottom: var(--spacing-lg);
        }

        .footer-title {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-sm);
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-subtitle {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-sm);
          color: var(--color-text-primary);
        }

        .footer-text {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-links a {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--color-accent-primary);
        }

        .social-links {
          display: flex;
          gap: var(--spacing-sm);
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          color: var(--color-text-primary);
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background: var(--gradient-primary);
          transform: translateY(-2px);
        }

        .footer-bottom {
          text-align: center;
          padding-top: var(--spacing-lg);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-text-muted);
          font-size: var(--font-size-sm);
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-nav {
            display: flex;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
          }
        }
      `}</style>
        </div>
    );
}
