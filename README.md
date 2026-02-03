# 🎮 Random Pokémon Generator

A premium, interactive web application built with React and Vite that allows users to discover and collect their favorite Pokémon using the PokeAPI.

## 🔗 Live Demo
[View Live Project](https://pokemon-seven-henna.vercel.app/)

## ✨ Features

- **Random Generation**: Instantly discover a new Pokémon from all generations (IDs 1-1010).
- **Advanced Search**: Find specific Pokémon by name or Pokédex number.
- **Detailed Stats**: View base stats with animated bars, types, height, weight, and abilities.
- **Favorites System**: Save your favorite Pokémon to a local collection (powered by `localStorage`).
- **Premium UI**: Glassmorphism design, smooth fade-in animations, and a responsive layout.
- **Dynamic Backgrounds**: Type-specific color coding for an immersive experience.

## 🚀 Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Glassmorphism Design)
- **API**: [PokeAPI](https://pokeapi.co/)
- **Icons**: Emoji-based for lightweight performance

## 📂 Project Structure

```text
RandomPokemon/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project images/icons
│   ├── Components/
│   │   ├── RandomPokemon.jsx   # Main logic & UI component
│   │   └── RandomPokemon.css   # Component-specific styles
│   ├── App.jsx          # Root component
│   ├── App.css          # Layout & Header styles
│   ├── index.css        # Global styles & Design system
│   └── main.jsx         # Entry point
├── index.html           # HTML template
└── package.json         # Dependencies & Scripts
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/RandomPokemon.git
   ```
2. Navigate to the project directory:
   ```bash
   cd RandomPokemon
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 🎨 Design Philosophy

The project focuses on a **"Modern Glass"** aesthetic, using semi-transparent backgrounds, subtle drop shadows, and vibrant gradients to create a premium feel. Every interaction is complemented by CSS transitions to ensure the UX feels snappy and polished.

## 📄 License

This project is open-source and available under the MIT License.
