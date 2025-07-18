import { useEffect, useState } from "react";
import axios from "axios";
import type { PokemonListResponse } from "../types/pokemon";

export function usePokemonList(limit = 20, offset = 0) {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get<PokemonListResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError("Failed to fetch Pokémon data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, offset]);

  return { data, loading, error };
}
