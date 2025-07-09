'use client';
// src/app/PokemonList.tsx

import { fetchPokemons } from '@/lib/pokeapi';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

interface PokemonListItem {
  name: string;
  url: string;
}

export function PokemonList() {
  const [allPokemons, setAllPokemons] = useState<PokemonListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getPokemons() {
      try {
        const data = await fetchPokemons(1300);
        setAllPokemons(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getPokemons();
  }, []);

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) {
      return allPokemons;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [allPokemons, searchTerm]);

  if (loading) {
    return <div className="text-white text-center text-xl mt-10">Loading Pokemons...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-10">Error: {error}</div>;
  }

  return (
    <>
      <div className="mb-8 p-2">
        <input
          type="text"
          placeholder="Search Pokemons..."
          className="w-full p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemons.length === 0 && searchTerm !== '' ? (
          <p className="col-span-full text-center text-white text-lg">No Pokemons found matching "{searchTerm}"</p>
        ) : (
          filteredPokemons.map((pokemon) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            if (!id) return null;

            return (
              <Link href={`/pokemon/${id}`} key={pokemon.name} passHref>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 relative group flex flex-col items-center p-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl font-bold text-white capitalize">
                      {pokemon.name}
                    </h2>
                  </div>
                  <div className="flex justify-center items-center bg-white/20 backdrop-filter backdrop-blur-sm rounded-lg p-2">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                      alt={pokemon.name}
                      className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}
