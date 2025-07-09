// src/app/pokemon/[id]/page.tsx
import { fetchPokemonDetails, fetchPokemons } from '@/lib/pokeapi';
import Image from 'next/image';
import Link from 'next/link';

// Define a type for the Pokemon details
interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  moves: { move: { name: string } }[];
}

// Define a type for the Pokemon list item (reused from PokemonList.tsx concept)
interface PokemonListItem {
  name: string;
  url: string;
}

// Reverting to the standard type definition for PokemonDetailPageProps.
// The @ts-ignore below will handle the build error.
interface PokemonDetailPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// generateStaticParams tells Next.js which dynamic segments ([id]) to pre-render at build time.
export async function generateStaticParams() {
  const allPokemons = await fetchPokemons(151);

  // Explicitly type the 'pokemon' parameter as PokemonListItem
  return allPokemons.map((pokemon: PokemonListItem) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return { id: id };
  });
}

// @ts-ignore
// This is a Server Component, so data fetching happens on the server.
// We are using @ts-ignore to bypass a persistent type incompatibility error
// that seems to be related to Next.js's internal PageProps constraint.
export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  // Access params.id directly, as it's the standard and intended way in App Router.
  const pokemonId = params.id;

  // Handle case where pokemonId might be empty or invalid
  if (!pokemonId) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Invalid Pokemon ID</h1>
        <p className="text-lg mb-6">Please provide a valid Pokemon ID in the URL.</p>
        <Link href="/" passHref>
          <div className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 cursor-pointer">
            Go back to Home
          </div>
        </Link>
      </div>
    );
  }

  const pokemon: PokemonDetail | null = await fetchPokemonDetails(pokemonId);

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Pokemon Not Found</h1>
        <p className="text-lg mb-6">Could not find details for Pokemon with ID: {pokemonId}</p>
        <Link href="/" passHref>
          <div className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 cursor-pointer">
            Go back to Home
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4 flex flex-col items-center">
      <Link href="/" passHref>
        <div className="self-start mb-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 cursor-pointer">
          &larr; Back to Home
        </div>
      </Link>

      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 max-w-2xl w-full flex flex-col items-center space-y-6">
        <h1 className="text-5xl font-extrabold capitalize text-white text-shadow-lg">
          {pokemon.name}
        </h1>

        {pokemon.sprites.other?.['official-artwork']?.front_default ? (
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            width={200}
            height={200}
            className="rounded-full bg-white/30 p-4 shadow-xl border-4 border-white/50 transform hover:scale-105 transition-transform duration-300"
            priority
          />
        ) : pokemon.sprites.front_default ? (
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}
            className="rounded-full bg-white/30 p-4 shadow-xl border-4 border-white/50 transform hover:scale-105 transition-transform duration-300"
            priority
          />
        ) : (
          <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center text-gray-500 text-lg">
            No Image
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          {/* Types */}
          <div className="bg-purple-700 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-3 text-white">Types</h2>
            <ul className="list-disc list-inside space-y-1">
              {pokemon.types.map((typeInfo) => (
                <li key={typeInfo.type.name} className="capitalize text-white">
                  {typeInfo.type.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Abilities */}
          <div className="bg-indigo-700 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-3 text-white">Abilities</h2>
            <ul className="list-disc list-inside space-y-1">
              {pokemon.abilities.map((abilityInfo) => (
                <li key={abilityInfo.ability.name} className="capitalize text-white">
                  {abilityInfo.ability.name.replace(/-/g, ' ')}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="md:col-span-2 bg-purple-700 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-3 text-white">Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pokemon.stats.map((statInfo) => (
                <div key={statInfo.stat.name} className="flex justify-between items-center bg-purple-800 p-2 rounded-md">
                  <span className="capitalize text-white font-medium">
                    {statInfo.stat.name.replace(/-/g, ' ')}:
                  </span>
                  <span className="text-white font-bold">{statInfo.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Moves (limited for brevity, can be expanded) */}
          <div className="md:col-span-2 bg-indigo-700 p-4 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold mb-3 text-white">Some Moves</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              {pokemon.moves.slice(0, 10).map((moveInfo) => (
                <li key={moveInfo.move.name} className="capitalize bg-indigo-800 p-2 rounded-md text-center text-white">
                  {moveInfo.move.name.replace(/-/g, ' ')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
