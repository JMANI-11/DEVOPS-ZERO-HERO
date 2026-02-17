import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({
    title,
    subtitle,
    description,
    primaryCTA,
    secondaryCTA,
    showStats = false
}) {
    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="container hero-content">
                <div className="hero-text animate-slide-up">
                    {subtitle && <p className="hero-subtitle">{subtitle}</p>}
                    <h1 className="hero-title">{title}</h1>
                    <p className="hero-description">{description}</p>

                    <div className="hero-cta">
                        {primaryCTA && (
                            <Link to={primaryCTA.link} className="btn btn-primary">
                                {primaryCTA.text}
                                <ArrowRight size={20} />
                            </Link>
                        )}
                        {secondaryCTA && (
                            <Link to={secondaryCTA.link} className="btn btn-secondary">
                                {secondaryCTA.text}
                            </Link>
                        )}
                    </div>
                </div>

                {showStats && (
                    <div className="hero-stats animate-fade-in">
                        <div className="stat-card">
                            <h3 className="stat-number">100+</h3>
                            <p className="stat-label">YouTube Videos</p>
                        </div>
                        <div className="stat-card">
                            <h3 className="stat-number">50K+</h3>
                            <p className="stat-label">Students Enrolled</p>
                        </div>
                        <div className="stat-card">
                            <h3 className="stat-number">4.8★</h3>
                            <p className="stat-label">Average Rating</p>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        .hero {
          position: relative;
          padding: var(--spacing-2xl) 0;
          overflow: hidden;
          min-height: 500px;
          display: flex;
          align-items: center;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient-hero);
          opacity: 0.6;
          z-index: -1;
        }

        .hero-background::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 20s ease-in-out infinite;
        }

        .hero-background::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 15s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .hero-text {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-subtitle {
          font-size: var(--font-size-lg);
          color: var(--color-accent-primary);
          font-weight: 600;
          margin-bottom: var(--spacing-sm);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .hero-title {
          font-size: var(--font-size-5xl);
          margin-bottom: var(--spacing-md);
          line-height: 1.1;
        }

        .hero-description {
          font-size: var(--font-size-xl);
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: flex;
          gap: var(--spacing-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);
          margin-top: var(--spacing-2xl);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .stat-card {
          padding: var(--spacing-lg);
          background: var(--color-surface);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-xl);
          transition: all var(--transition-base);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .stat-number {
          font-size: var(--font-size-4xl);
          font-weight: 700;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: var(--spacing-xs);
        }

        .stat-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 400px;
            padding: var(--spacing-xl) 0;
          }

          .hero-stats {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .hero-cta {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
        </section>
    );
}
