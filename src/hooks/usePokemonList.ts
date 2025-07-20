import { useEffect, useRef, useState, useLayoutEffect } from "react";
import type { PokemonBasic } from "../types/pokemon";

const STORAGE_KEY = "pokemon_list_state";

interface PokemonListState {
  pokemons: PokemonBasic[];
  page: number;
  scrollY: number;
}

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

  // --- Restore state from sessionStorage ---
  useLayoutEffect(() => {
    if (search.length > 0) return;

    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const { pokemons, page, scrollY }: PokemonListState =
        JSON.parse(savedState);
      setPokemons(pokemons);
      setPage(page);
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
      return;
    }

    fetchPokemon(1);
  }, [search]);

  // --- Save state on unmount ---
  useEffect(() => {
    return () => {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ pokemons, page, scrollY: window.scrollY })
      );
    };
  }, [pokemons, page]);

  // Reset list when search changes (if clearing search)
  useEffect(() => {
    if (search.length < 3) {
      // If search is cleared, reset list and refetch page 1
      if (pokemons.length === 0) {
        setPokemons([]);
        setPage(1);
        fetchPokemon(1);
      }
    }
  }, [search]);

  // Infinite scroll observer
  useEffect(() => {
    if (search.length >= 3) return; // disable infinite scroll when searching

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

  // Fetch next pages
  useEffect(() => {
    if (page > 1 && search.length < 3) {
      fetchPokemon(page);
    }
  }, [page, search]);

  return { pokemons, loading, error, observerRef };
}
