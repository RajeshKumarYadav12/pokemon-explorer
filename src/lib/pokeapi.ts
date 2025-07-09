// src/lib/pokeapi.ts

const BASE_URL = 'https://pokeapi.co/api/v2/';

export async function fetchPokemons(limit: number = 20, offset: number = 0) {
  try {
    const response = await fetch(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`Error fetching Pokemons: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch Pokemons:", error);
    return [];
  }
}

export async function fetchPokemonDetails(nameOrId: string | number) {
  try {
    const response = await fetch(`${BASE_URL}pokemon/${nameOrId}`);
    if (!response.ok) {
      throw new Error(`Error fetching Pokemon details for ${nameOrId}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch Pokemon details for ${nameOrId}:`, error);
    return null;
  }
}
