// src/app/page.tsx
import { PokemonList } from './PokemonList';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 bg-gray-800 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-white">Pokemon Explorer</h1>
      <PokemonList />
    </div>
  );
}
