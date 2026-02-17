import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            // Form is valid - in a real app, you'd send this to a backend
            console.log('Form submitted:', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div className="page-header animate-slide-up">
                    <h1>Get In Touch</h1>
                    <p className="page-description">
                        Have questions about courses or need help with DevOps? I'd love to hear from you!
                    </p>
                </div>

                <div className="contact-wrapper">
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-icon">
                                <Mail size={24} />
                            </div>
                            <h3>Email</h3>
                            <p>contact@devopsacademy.com</p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">
                                <MapPin size={24} />
                            </div>
                            <h3>Location</h3>
                            <p>Available for remote consulting worldwide</p>
                        </div>

                        <div className="social-section">
                            <h3>Follow Me</h3>
                            <p>Stay updated with the latest DevOps tutorials and tips</p>
                            <div className="social-links">
                                <a
                                    href="https://youtube.com/@AbhishekVeeramalla"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-btn"
                                >
                                    YouTube
                                </a>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {submitted && (
                            <div className="success-message animate-slide-down">
                                <CheckCircle size={20} />
                                <span>Thank you! Your message has been sent successfully.</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`input ${errors.name ? 'error' : ''}`}
                                placeholder="Your name"
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`input ${errors.email ? 'error' : ''}`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={`input ${errors.subject ? 'error' : ''}`}
                                placeholder="What is this about?"
                            />
                            {errors.subject && <span className="error-message">{errors.subject}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`input ${errors.message ? 'error' : ''}`}
                                placeholder="Your message..."
                                rows="6"
                            />
                            {errors.message && <span className="error-message">{errors.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">
                            <Send size={20} />
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
        .page {
          padding: var(--spacing-xl) 0;
          min-height: 100vh;
        }

        .page-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .page-header h1 {
          margin-bottom: var(--spacing-md);
        }

        .page-description {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
        }

        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--spacing-2xl);
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .info-card {
          padding: var(--spacing-lg);
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .info-icon {
          display: inline-flex;
          padding: var(--spacing-md);
          background: var(--gradient-primary);
          border-radius: var(--radius-lg);
          color: white;
          margin-bottom: var(--spacing-md);
        }

        .info-card h3 {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-xs);
          color: var(--color-text-primary);
        }

        .info-card p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
        }

        .social-section {
          padding: var(--spacing-lg);
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-section h3 {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-xs);
          color: var(--color-text-primary);
        }

        .social-section p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          margin-bottom: var(--spacing-md);
        }

        .social-links {
          display: flex;
          gap: var(--spacing-sm);
        }

        .social-btn {
          flex: 1;
          padding: 0.75rem;
          background: var(--gradient-primary);
          color: white;
          border-radius: var(--radius-lg);
          text-align: center;
          font-weight: 600;
          transition: all var(--transition-base);
        }

        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .contact-form {
          padding: var(--spacing-xl);
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-group {
          margin-bottom: var(--spacing-lg);
        }

        .form-group label {
          display: block;
          margin-bottom: var(--spacing-xs);
          font-weight: 600;
          color: var(--color-text-primary);
          font-size: var(--font-size-sm);
        }

        .input.error {
          border-color: #ef4444;
        }

        .error-message {
          display: block;
          margin-top: var(--spacing-xs);
          color: #ef4444;
          font-size: var(--font-size-xs);
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-lg);
          color: #22c55e;
          margin-bottom: var(--spacing-lg);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
