import { useState, useEffect } from 'react';
import Card from '../components/Card';
import FilterBar from '../components/FilterBar';
import { fetchUdemyCourses, filterItems, getCategories } from '../utils/api';

export default function Udemy() {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState('rating');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            const data = await fetchUdemyCourses();
            setCourses(data);
            setFilteredCourses(data);
            setCategories(getCategories(data));
            setLoading(false);
        };

        loadCourses();
    }, []);

    useEffect(() => {
        const filtered = filterItems(courses, searchTerm, selectedCategory, selectedSort);
        setFilteredCourses(filtered);
    }, [searchTerm, selectedCategory, selectedSort, courses]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedSort('rating');
    };

    const sortOptions = [
        { value: 'rating', label: 'Highest Rated' },
        { value: 'students', label: 'Most Students' },
        { value: 'recent', label: 'Most Recent' },
    ];

    return (
        <div className="page">
            <div className="container">
                <div className="page-header animate-slide-up">
                    <h1>Udemy Courses</h1>
                    <p className="page-description">
                        Premium, in-depth courses with hands-on projects and lifetime access. Invest in your DevOps career with comprehensive training programs.
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
                ) : filteredCourses.length === 0 ? (
                    <div className="no-results">
                        <p>No courses found matching your criteria.</p>
                        <button onClick={handleClearFilters} className="btn btn-primary">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="results-count">
                            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                        </div>
                        <div className="grid grid-cols-3">
                            {filteredCourses.map(course => (
                                <Card key={course.id} item={course} type="udemy" />
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
