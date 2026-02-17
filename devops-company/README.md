# DevOps Academy - Training Website

A modern, professional DevOps and Cloud training platform built with React and Vite. Features YouTube tutorials, Udemy courses, freelance projects showcase, and a contact form.

## 🚀 Features

- **Modern Design**: Dark theme with glassmorphism effects, gradients, and smooth animations
- **Responsive**: Mobile-first design that works perfectly on all devices
- **SEO Optimized**: Comprehensive meta tags and semantic HTML
- **Fast Performance**: Built with Vite for lightning-fast development and production builds
- **Content Pages**:
  - Home page with hero section, features, and testimonials
  - YouTube tutorials with filtering and search
  - Udemy courses with filtering and sorting
  - Freelance projects showcase
  - Contact form with validation

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd /Users/abhi/Downloads/antigravity-workspace
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
antigravity-workspace/
├── public/                    # Static assets and images
│   ├── *.png                 # Course thumbnails
│   └── vite.svg              # Favicon
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Layout.jsx        # Main layout with header/footer
│   │   ├── Card.jsx          # Content card component
│   │   ├── FilterBar.jsx     # Search and filter component
│   │   └── Hero.jsx          # Hero section component
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── YouTube.jsx       # YouTube tutorials page
│   │   ├── Udemy.jsx         # Udemy courses page
│   │   ├── Projects.jsx      # Projects showcase page
│   │   └── Contact.jsx       # Contact form page
│   ├── data/                 # JSON data files
│   │   ├── youtube.json      # YouTube videos data
│   │   ├── udemy.json        # Udemy courses data
│   │   └── projects.json     # Projects data
│   ├── utils/                # Utility functions
│   │   └── api.js            # Data fetching and filtering
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles and design system
├── index.html                # HTML template with SEO tags
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🎨 Customization

### Updating Content

All content is stored in JSON files in the `src/data/` directory:

- **YouTube Videos**: Edit `src/data/youtube.json`
- **Udemy Courses**: Edit `src/data/udemy.json`
- **Projects**: Edit `src/data/projects.json`

Each JSON file contains an array of objects with the following structure:

**YouTube Videos**:
```json
{
  "id": 1,
  "title": "Video Title",
  "description": "Video description",
  "thumbnail": "/path/to/image.png",
  "duration": "3:45:20",
  "views": "245K",
  "category": "Kubernetes",
  "tags": ["Kubernetes", "DevOps"],
  "url": "https://youtube.com/..."
}
```

**Udemy Courses**:
```json
{
  "id": 1,
  "title": "Course Title",
  "description": "Course description",
  "thumbnail": "/path/to/image.png",
  "price": "$49.99",
  "rating": 4.8,
  "students": "45,230",
  "category": "DevOps",
  "tags": ["DevOps", "Docker"],
  "url": "https://udemy.com/..."
}
```

**Projects**:
```json
{
  "id": 1,
  "title": "Project Title",
  "description": "Project description",
  "thumbnail": "/path/to/image.png",
  "technologies": ["AWS", "Docker", "Kubernetes"],
  "category": "Cloud Migration",
  "client": "Client Name",
  "completionDate": "Dec 2023"
}
```

### Adding Images

1. Place your images in the `public/` directory
2. Reference them in JSON files using the path: `/image-name.png`

### Styling

The design system is defined in `src/index.css` using CSS custom properties:

- **Colors**: Modify the color palette in the `:root` section
- **Spacing**: Adjust spacing variables
- **Typography**: Change font sizes and families
- **Animations**: Customize animation timings and effects

## 🌐 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

### Other Platforms

The built files in the `dist` folder can be deployed to any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages

## 🔧 Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Lucide React**: Icon library
- **CSS3**: Styling with modern features

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or issues, please use the contact form on the website or reach out through the social links provided.

---

Built with ❤️ using React and Vite
