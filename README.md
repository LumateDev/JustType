# Just Type ⌨️ (Frontend Demo)

**A modern typing practice SPA** - Frontend-only demo version deployed on Vercel



## 🎯 About This Demo

This is the **frontend-only demonstration version** of Just Type, deployed on Vercel. It connects to a live API backend and showcases the complete user interface and typing experience.

**🔗 Live Demo:** in progres

## 🚀 Tech Stack (This Demo)

### Frontend
- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe development
- **Composition API** - Modern Vue component structure
- **Vite** - Next-generation build tool
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Vercel** - Instant deployment and hosting

## ✨ Features

### 🎮 Typing Experience
- Real-time typing speed calculation (WPM, CPM)
- Accuracy tracking and error highlighting
- Multiple text modes (quotes, code, custom text)
- Timer-based and word-count typing sessions

### 📊 Progress Tracking
- Session statistics and history
- Accuracy metrics and error analysis
- Personal best records
- Progress visualization charts

## 🏗️ Project Structure

```
just-type-client/
├── public/              # Static assets
│   └── favicon.ico
├── src/
│   ├── assets/         # Styles, images, fonts
│   ├── components/     # Reusable Vue components
│   ├── views/          # Page components
│   ├── stores/         # Pinia state management
│   ├── router/         # Vue Router configuration
│   ├── services/       # API services
│   ├── types/          # TypeScript definitions
│   └── utils/          # Helper functions
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── vercel.json         # Vercel deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/LumateDev/JustType.git
cd JustType/justtype.client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`


## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎨 Customization

### Themes
Edit `src/assets/main.scss` to customize colors and styles

### Text Sources
Configure text sources in `src/services/textService.ts`

### Keyboard Layout
Modify keyboard layouts in `src/utils/keyboardLayouts.ts`

## 🤝 Contributing

This is a demo version. For full-stack development, check out the master branch:

```bash
git checkout master
```

## 📄 License

This project is part of the Just Type application. See main repository for license information.

## 🔗 Links

- **Main Repository**: [https://github.com/LumateDev/JustType](https://github.com/LumateDev/JustType)
- **Live Demo**: in progres
- **API Documentation**: in progres

---