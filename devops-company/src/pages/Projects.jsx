import { useState, useEffect } from 'react';
import Card from '../components/Card';
import FilterBar from '../components/FilterBar';
import { fetchProjects, filterItems, getCategories } from '../utils/api';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('recent');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            const data = await fetchProjects();
            setProjects(data);
            setFilteredProjects(data);
            setCategories(getCategories(data));
            setLoading(false);
        };

        loadProjects();
    }, []);

    useEffect(() => {
        const filtered = filterItems(projects, searchTerm, selectedCategory, selectedSort);
        setFilteredProjects(filtered);
    }, [searchTerm, selectedCategory, selectedSort, projects]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedSort('recent');
    };

    const sortOptions = [
        { value: 'recent', label: 'Most Recent' },
    ];

    return (
        <div className="page">
            <div className="container">
                <div className="page-header animate-slide-up">
                    <h1>Freelance Projects</h1>
                    <p className="page-description">
                        Real-world DevOps projects and case studies. Learn from production implementations and best practices used in enterprise environments.
                    </p>
                </div>

                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    sortOptions={sortOptions}
                    selectedSort={selectedSort}
                    onSortChange={setSelectedSort}
                    onClearFilters={handleClearFilters}
                />

                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="no-results">
                        <p>No projects found matching your criteria.</p>
                        <button onClick={handleClearFilters} className="btn btn-primary">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="results-count">
                            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                        </div>
                        <div className="grid grid-cols-3">
                            {filteredProjects.map(project => (
                                <Card key={project.id} item={project} type="project" />
                            ))}
                        </div>
                    </>
                )}
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

        .results-count {
          margin-bottom: var(--spacing-md);
          color: var(--color-text-muted);
          font-size: var(--font-size-sm);
        }

        .no-results {
          text-align: center;
          padding: var(--spacing-2xl);
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .no-results p {
          font-size: var(--font-size-lg);
          margin-bottom: var(--spacing-lg);
          color: var(--color-text-secondary);
        }
      `}</style>
        </div>
    );
}
