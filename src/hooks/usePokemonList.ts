import { useEffect, useRef, useState } from "react";
import type { PokemonBasic } from "../types/pokemon";

export function usePokemonList(search: string) {
  const [pokemons, setPokemons] = useState<PokemonBasic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPokemon = async (pageNumber: number) => {
    try {
      setLoading(true);
      const offset = (pageNumber - 1) * 20;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch Pokémon");
      const data = await res.json();
      setPokemons((prev) => [...prev, ...data.results]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) setError(err);
    }
  };

  useEffect(() => {
    if (search.length < 3) {
      setPokemons([]);
      setPage(1);
      fetchPokemon(1);
    }
  }, [search]);

  useEffect(() => {
    if (search.length >= 3) return;

    const sentinel = observerRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [loading, search]);

  useEffect(() => {
    if (page > 1 && search.length < 3) {
      fetchPokemon(page);
    }
  }, [page, search]);

  return { pokemons, loading, error, observerRef };
}
