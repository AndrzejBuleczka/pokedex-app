# Pokédex App

A simple Pokédex application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.  
Browse, search, and view details for Pokémon using data from the [PokeAPI](https://pokeapi.co/).

---

## 🚀 Live Demo

**[➡ View the app on Vercel](https://pokedex-jvpmxfvne-andrzejbuleczkas-projects.vercel.app/)**

---

## ✨ Features

- **Infinite scrolling Pokémon list** – load more Pokémon as you scroll.
- **Search** – quickly find Pokémon by name (min 3 letters).
- **Pokémon details** – view stats, types, and abilities.
- **Responsive UI** – built with Tailwind CSS for mobile-first design.
- **Fast builds & HMR** – powered by Vite.

---

## ⚙️ Setup Instructions
### 1. Clone the repository

```sh
git clone https://github.com/your-username/pokedex-app.git
cd pokedex-app
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### 4. Build for production

```sh
npm run build
```

### 5. Preview the production build

```sh
npm run preview
```

## Linting

To check code quality with ESLint:

```sh
npm run lint
```

## Project Structure

```
src/
  App.tsx                # Main app component with routing
  Layout.tsx             # Layout wrapper
  main.tsx               # Entry point
  components/
    PokemonCard.tsx      # Card component for Pokémon list
  hooks/
    useAllPokemonList.ts # Fetch all Pokémon for search
    usePokemonList.ts    # Infinite scroll Pokémon list
    usePokemonDetails.ts # Fetch Pokémon details
  pages/
    Home.tsx             # Home page with search and list
    PokemonDetails.tsx   # Pokémon details modal/page
  types/
    pokemon.ts           # TypeScript types for Pokémon data
```

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Highcharts](https://www.highcharts.com/)
- [PokeAPI](https://pokeapi.co/)

---

**Author:** Andrzej Bułeczka