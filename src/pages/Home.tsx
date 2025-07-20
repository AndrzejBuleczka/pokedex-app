import { useState, useMemo } from "react";
import { useAllPokemonList } from "../hooks/useAllPokemonList";
import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data: allPokemon, loading: allLoading } = useAllPokemonList();
  const { pokemons, loading, error, observerRef } = usePokemonList(search);

  const searchResults = useMemo(() => {
    if (search.length < 3 || !allPokemon) return [];
    return allPokemon
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 10);
  }, [search, allPokemon]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Pokédex</h1>

      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search Pokémon (min 3 letters)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {search.length >= 3 ? (
        <div className="mb-6">
          {allLoading && <p className="text-center">Loading all Pokémon...</p>}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {searchResults.map((pokemon) => {
                const id = pokemon.url.split("/").filter(Boolean).pop();
                const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                return (
                  <PokemonCard
                    key={pokemon.name}
                    pokemon={pokemon}
                    image={image}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No matches found.</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {pokemons.map((pokemon) => {
              const id = pokemon.url.split("/").filter(Boolean).pop();
              const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

              return (
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  image={image}
                />
              );
            })}
          </div>
          <div ref={observerRef} className="h-10" />
          {loading && <p className="text-center">Loading more Pokémon...</p>}
          {error && <p className="text-center text-red-500">{error.message}</p>}
        </>
      )}
    </div>
  );
}
