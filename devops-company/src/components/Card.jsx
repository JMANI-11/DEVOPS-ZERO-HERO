import { ExternalLink } from 'lucide-react';

export default function Card({ item, type }) {
    const renderTags = () => {
        const tags = item.tags || [];
        return (
            <div className="tags">
                {tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="tag">
                        {tag}
                    </span>
                ))}
            </div>
        );
    };

    const renderMetadata = () => {
        switch (type) {
            case 'youtube':
                return (
                    <div className="card-meta">
                        <span>{item.duration}</span>
                        <span>•</span>
                        <span>{item.views} views</span>
                    </div>
                );
            case 'udemy':
                return (
                    <div className="card-meta">
                        <span className="rating">⭐ {item.rating}</span>
                        <span>•</span>
                        <span>{item.students} students</span>
                        {item.price && <span className="price">{item.price}</span>}
                    </div>
                );
            case 'project':
                return (
                    <div className="card-meta">
                        <span>{item.client}</span>
                        <span>•</span>
                        <span>{item.completionDate}</span>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleClick = () => {
        if (item.url) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="card" onClick={handleClick} style={{ cursor: item.url ? 'pointer' : 'default' }}>
            {item.thumbnail && (
                <img src={item.thumbnail} alt={item.title} className="card-image" />
            )}

            <div className="card-content">
                <h3 className="card-title">{item.title}</h3>

                {renderMetadata()}

                <p className="card-description">{item.description}</p>

                {item.technologies && (
                    <div className="technologies">
                        {item.technologies.map((tech, index) => (
                            <span key={index} className="tech-badge">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {renderTags()}

                {item.url && (
                    <div className="card-link">
                        <span>View {type === 'youtube' ? 'Video' : type === 'udemy' ? 'Course' : 'Project'}</span>
                        <ExternalLink size={16} />
                    </div>
                )}
            </div>

            <style jsx>{`
        .card-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: var(--font-size-sm);
          color: var(--color-text-muted);
          margin-bottom: var(--spacing-xs);
        }

        .rating {
          color: #fbbf24;
          font-weight: 600;
        }

        .price {
          margin-left: auto;
          color: var(--color-accent-tertiary);
          font-weight: 700;
          font-size: var(--font-size-lg);
        }

        .technologies {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
          margin-top: var(--spacing-xs);
        }

        .tech-badge {
          padding: 0.25rem 0.75rem;
          font-size: var(--font-size-xs);
          font-weight: 600;
          border-radius: var(--radius-md);
          background: rgba(6, 182, 212, 0.1);
          color: var(--color-accent-tertiary);
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .card-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-top: var(--spacing-sm);
          color: var(--color-accent-primary);
          font-weight: 600;
          font-size: var(--font-size-sm);
        }
      `}</style>
        </div>
    );
}
