import { useEffect, useState } from "react";

export function useAllPokemonList() {
  const [data, setData] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
        if (!res.ok) throw new Error("Failed to fetch Pokémon list");
        const json = await res.json();
        setData(json.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  return { data, loading, error };
}
