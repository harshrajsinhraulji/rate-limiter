
export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export async function getPokemonList(): Promise<PokemonListResponse> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!response.ok) {
    throw new Error("Failed to fetch pokemon list");
  }
  const data = await response.json();
  return data;
}
