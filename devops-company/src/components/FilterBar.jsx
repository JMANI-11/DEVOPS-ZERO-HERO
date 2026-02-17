import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function FilterBar({
    searchTerm,
    onSearchChange,
    categories,
    selectedCategory,
    onCategoryChange,
    sortOptions,
    selectedSort,
    onSortChange,
    onClearFilters
}) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="filter-bar">
            <div className="search-wrapper">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="input search-input"
                />
                {searchTerm && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="clear-search"
                        aria-label="Clear search"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <button
                className="filter-toggle btn-secondary"
                onClick={() => setShowFilters(!showFilters)}
            >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
            </button>

            {showFilters && (
                <div className="filters-panel animate-slide-down">
                    {categories && categories.length > 0 && (
                        <div className="filter-group">
                            <label className="filter-label">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => onCategoryChange(e.target.value)}
                                className="input filter-select"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {sortOptions && sortOptions.length > 0 && (
                        <div className="filter-group">
                            <label className="filter-label">Sort By</label>
                            <select
                                value={selectedSort}
                                onChange={(e) => onSortChange(e.target.value)}
                                className="input filter-select"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button onClick={onClearFilters} className="btn-secondary clear-filters">
                        Clear All Filters
                    </button>
                </div>
            )}

            <style jsx>{`
        .filter-bar {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-xl);
          padding: var(--spacing-lg);
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .search-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-text-muted);
          pointer-events: none;
        }

        .search-input {
          padding-left: 3rem;
          padding-right: 3rem;
        }

        .clear-search {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          transition: color var(--transition-fast);
        }

        .clear-search:hover {
          color: var(--color-text-primary);
        }

        .filter-toggle {
          align-self: flex-start;
        }

        .filters-panel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .filter-label {
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .filter-select {
          cursor: pointer;
        }

        .clear-filters {
          grid-column: 1 / -1;
          width: fit-content;
        }

        @media (max-width: 768px) {
          .filters-panel {
            grid-template-columns: 1fr;
          }

          .clear-filters {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
}
