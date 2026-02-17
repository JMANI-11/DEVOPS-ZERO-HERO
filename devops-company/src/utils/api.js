// Simulated API for fetching data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchYouTubeVideos = async () => {
    await delay(300);
    const response = await fetch('/src/data/youtube.json');
    return response.json();
};

export const fetchUdemyCourses = async () => {
    await delay(300);
    const response = await fetch('/src/data/udemy.json');
    return response.json();
};

export const fetchProjects = async () => {
    await delay(300);
    const response = await fetch('/src/data/projects.json');
    return response.json();
};

// Filter and search utilities
export const filterItems = (items, searchTerm, category, sortBy) => {
    let filtered = [...items];

    // Search filter
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.tags?.some(tag => tag.toLowerCase().includes(term))
        );
    }

    // Category filter
    if (category) {
        filtered = filtered.filter(item => item.category === category);
    }

    // Sorting
    if (sortBy) {
        switch (sortBy) {
            case 'views':
                filtered.sort((a, b) => {
                    const viewsA = parseInt(a.views?.replace('K', '000') || '0');
                    const viewsB = parseInt(b.views?.replace('K', '000') || '0');
                    return viewsB - viewsA;
                });
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'students':
                filtered.sort((a, b) => {
                    const studentsA = parseInt(a.students?.replace(/,/g, '') || '0');
                    const studentsB = parseInt(b.students?.replace(/,/g, '') || '0');
                    return studentsB - studentsA;
                });
                break;
            case 'recent':
                filtered.reverse();
                break;
            default:
                break;
        }
    }

    return filtered;
};

// Get unique categories from items
export const getCategories = (items) => {
    const categories = items.map(item => item.category);
    return [...new Set(categories)].filter(Boolean);
};
