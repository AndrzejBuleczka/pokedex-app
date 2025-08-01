import { useEffect, useState } from "react";
import type { PokemonBasic } from "../types/pokemon";

export function useAllPokemonList() {
  const [data, setData] = useState<PokemonBasic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
        if (!res.ok) throw new Error("Failed to fetch Pokémon list");
        const json = await res.json();
        setData(json.results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  return { data, loading, error };
}
