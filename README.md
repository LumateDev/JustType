# Just Type ⌨️

**The rebirth of the Just Type project in a new design, using new technologies and new ideas**

A modern web application for typing practice and speed training, completely rewritten with cutting-edge technologies.

## 🚀 Tech Stack

### Backend
- **C# ASP.NET Core 9** - High-performance backend framework
- **Entity Framework Core 9** - ORM for database management
- **PostgreSQL** - Relational database for data persistence
- **JWT Authentication** - Secure user authentication
- **Swagger/OpenAPI** - API documentation

### Frontend  
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript development
- **Composition API** - Modern Vue component structure
- **Vite** - Next-generation frontend tooling
- **Pinia** - State management for Vue
- **Vue Router** - Single-page application routing

### Development & DevOps
- **Git** - Version control system
- **Docker** - Containerization for development and deployment
- **Docker Compose** - Multi-container application management
- **WSL2** - Windows Subsystem for Linux development environment

## 📋 Project Features

### Core Functionality
- Real-time typing speed calculation (WPM, CPM)
- Accuracy tracking and error analysis
- Multiple typing modes (text, code, quotes)
- Progress statistics and history
- User profiles and achievements

### Technical Features
- Responsive design for desktop and mobile
- PWA (Progressive Web App) capabilities
- Offline functionality
- Real-time performance metrics
- RESTful API architecture

## 🏗️ Project Structure

```
just-type/
├── JustType.Server/          # ASP.NET Core 9 Web API
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   └── Properties/
├── JustType.Client/          # Vue 3 + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── stores/
│   │   └── router/
│   └── public/
├── docker-compose.yml        # Docker composition
├── Dockerfile               # Backend containerization
└── README.md               # Project documentation
```

## 🛠️ Development Setup

### Prerequisites
- .NET 9 SDK
- Node.js 18+
- PostgreSQL 15+
- Docker Desktop
- Git

### Quick Start
```bash
# Clone repository
git clone https://github.com/LumateDev/JustType
cd just-type

# Run with Docker Compose
docker-compose up -d
```

## 🌟 Why Rewrite?

- **Performance**: ASP.NET Core 9 offers exceptional speed and efficiency
- **Type Safety**: TypeScript prevents runtime errors
- **Modern Ecosystem**: Latest versions of all frameworks
- **Developer Experience**: Improved tooling and hot reload
- **Scalability**: Better architecture for future features