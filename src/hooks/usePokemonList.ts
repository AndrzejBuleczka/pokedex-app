import { useEffect, useState, useCallback, useRef } from "react";
import type { PokemonListResponse } from "../types/pokemon";

export function usePokemonList(limit = 20) {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // offsetRef ensures we always have the latest offset
  const offsetRef = useRef(0);

  const fetchPokemon = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsetRef.current}`
      );
      if (!res.ok) throw new Error("Failed to fetch Pokémon");
      const json = (await res.json()) as PokemonListResponse;

      setData((prev) => ({
        count: json.count,
        next: json.next,
        previous: json.previous,
        results: prev ? [...prev.results, ...json.results] : json.results,
      }));

      offsetRef.current += limit;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Initial load
  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return { data, loading, error, loadMore: fetchPokemon };
}