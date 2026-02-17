import { useState, useEffect } from 'react';
import Card from '../components/Card';
import FilterBar from '../components/FilterBar';
import { fetchYouTubeVideos, filterItems, getCategories } from '../utils/api';

export default function YouTube() {
    const [videos, setVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('recent');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            const data = await fetchYouTubeVideos();
            setVideos(data);
            setFilteredVideos(data);
            setCategories(getCategories(data));
            setLoading(false);
        };

        loadVideos();
    }, []);

    useEffect(() => {
        const filtered = filterItems(videos, searchTerm, selectedCategory, selectedSort);
        setFilteredVideos(filtered);
    }, [searchTerm, selectedCategory, selectedSort, videos]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedSort('recent');
    };

    const sortOptions = [
        { value: 'recent', label: 'Most Recent' },
        { value: 'views', label: 'Most Viewed' },
    ];

    return (
        <div className="page">
            <div className="container">
                <div className="page-header animate-slide-up">
                    <h1>YouTube Tutorials</h1>
                    <p className="page-description">
                        Free, comprehensive DevOps and Cloud tutorials. Learn at your own pace with hands-on examples and real-world scenarios.
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
                ) : filteredVideos.length === 0 ? (
                    <div className="no-results">
                        <p>No videos found matching your criteria.</p>
                        <button onClick={handleClearFilters} className="btn btn-primary">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="results-count">
                            Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
                        </div>
                        <div className="grid grid-cols-3">
                            {filteredVideos.map(video => (
                                <Card key={video.id} item={video} type="youtube" />
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
