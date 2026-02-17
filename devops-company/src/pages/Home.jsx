import Hero from '../components/Hero';
import Card from '../components/Card';
import { Youtube, GraduationCap, Briefcase, TrendingUp, Users, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchYouTubeVideos, fetchUdemyCourses, fetchProjects } from '../utils/api';

export default function Home() {
    const [featuredVideos, setFeaturedVideos] = useState([]);
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [featuredProjects, setFeaturedProjects] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const videos = await fetchYouTubeVideos();
            const courses = await fetchUdemyCourses();
            const projects = await fetchProjects();

            setFeaturedVideos(videos.slice(0, 3));
            setFeaturedCourses(courses.slice(0, 3));
            setFeaturedProjects(projects.slice(0, 3));
        };

        loadData();
    }, []);

    return (
        <div className="home-page">
            <Hero
                subtitle="Learn DevOps"
                title="Master Modern DevOps Engineering"
                description="Transform your career with comprehensive DevOps and Cloud training. Learn from industry experts through hands-on tutorials, courses, and real-world projects."
                primaryCTA={{ text: 'Explore Courses', link: '/udemy' }}
                secondaryCTA={{ text: 'Watch Tutorials', link: '/youtube' }}
                showStats={true}
            />

            {/* Features Section */}
            <section className="section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Youtube size={32} />
                            </div>
                            <h3>Free YouTube Content</h3>
                            <p>Access 100+ free tutorials covering Docker, Kubernetes, CI/CD, and more</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <GraduationCap size={32} />
                            </div>
                            <h3>Premium Courses</h3>
                            <p>In-depth Udemy courses with hands-on projects and certifications</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Briefcase size={32} />
                            </div>
                            <h3>Real Projects</h3>
                            <p>Learn from production-grade freelance projects and case studies</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <TrendingUp size={32} />
                            </div>
                            <h3>Career Growth</h3>
                            <p>Build skills that top companies are actively seeking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured YouTube Videos */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured YouTube Tutorials</h2>
                        <a href="/youtube" className="view-all">View All →</a>
                    </div>
                    <div className="grid grid-cols-3">
                        {featuredVideos.map(video => (
                            <Card key={video.id} item={video} type="youtube" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Udemy Courses */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Popular Udemy Courses</h2>
                        <a href="/udemy" className="view-all">View All →</a>
                    </div>
                    <div className="grid grid-cols-3">
                        {featuredCourses.map(course => (
                            <Card key={course.id} item={course} type="udemy" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Recent Projects</h2>
                        <a href="/projects" className="view-all">View All →</a>
                    </div>
                    <div className="grid grid-cols-3">
                        {featuredProjects.map(project => (
                            <Card key={project.id} item={project} type="project" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section testimonials-section">
                <div className="container">
                    <h2 className="section-title">What Students Say</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="testimonial-text">
                                "The best DevOps content I've found online. Clear explanations and practical examples that actually work in production."
                            </p>
                            <div className="testimonial-author">
                                <strong>Sarah Johnson</strong>
                                <span>DevOps Engineer at TechCorp</span>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="testimonial-text">
                                "Went from zero DevOps knowledge to landing my dream job in 6 months. These courses are worth every penny!"
                            </p>
                            <div className="testimonial-author">
                                <strong>Michael Chen</strong>
                                <span>Cloud Engineer at StartupXYZ</span>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="testimonial-text">
                                "Comprehensive, up-to-date, and taught by someone who clearly knows the field inside out. Highly recommended!"
                            </p>
                            <div className="testimonial-author">
                                <strong>Priya Sharma</strong>
                                <span>Senior SRE at CloudScale</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-lg);
        }

        .feature-card {
          text-align: center;
          padding: var(--spacing-xl);
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all var(--transition-base);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: var(--shadow-xl);
        }

        .feature-icon {
          display: inline-flex;
          padding: var(--spacing-md);
          background: var(--gradient-primary);
          border-radius: var(--radius-lg);
          color: white;
          margin-bottom: var(--spacing-md);
        }

        .feature-card h3 {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-sm);
          color: var(--color-text-primary);
        }

        .feature-card p {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-xl);
        }

        .view-all {
          color: var(--color-accent-primary);
          font-weight: 600;
          transition: transform var(--transition-fast);
        }

        .view-all:hover {
          transform: translateX(4px);
        }

        .testimonials-section {
          background: var(--color-bg-secondary);
          margin: var(--spacing-2xl) 0;
          padding: var(--spacing-2xl) 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);
        }

        .testimonial-card {
          padding: var(--spacing-xl);
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stars {
          display: flex;
          gap: 0.25rem;
          color: #fbbf24;
          margin-bottom: var(--spacing-md);
        }

        .testimonial-text {
          font-size: var(--font-size-base);
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-md);
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .testimonial-author strong {
          color: var(--color-text-primary);
          font-size: var(--font-size-base);
        }

        .testimonial-author span {
          color: var(--color-text-muted);
          font-size: var(--font-size-sm);
        }

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .features-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
