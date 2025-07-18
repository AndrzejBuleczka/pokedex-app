import { useState, useMemo } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { useAllPokemonList } from "../hooks/useAllPokemonList";
import { Link } from "react-router-dom";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 20;

  const { data, loading, error } = usePokemonList(limit, offset);
  const { data: allPokemon, loading: allLoading } = useAllPokemonList();

  const handleNext = () => {
    if (data?.next) setOffset(offset + limit);
  };

  const handlePrevious = () => {
    if (offset > 0) setOffset(offset - limit);
  };

  // Filter all Pokémon for partial match (if search length >= 3)
  const searchResults = useMemo(() => {
    if (search.length < 3) return [];
    return allPokemon
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 10); // limit to 10 results for performance
  }, [search, allPokemon]);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Pokédex</h1>

      {/* Search bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search Pokémon (min 3 letters)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Search Results */}
      {search.length >= 3 && (
        <div className="mb-6">
          {allLoading && <p className="text-center">Loading all Pokémon...</p>}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {searchResults.map((pokemon) => {
                const id = pokemon.url.split("/").filter(Boolean).pop();
                const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                return (
                  <Link
                    to={`/pokemon/${pokemon.name}`}
                    key={pokemon.name}
                    className="bg-white rounded-xl shadow hover:shadow-lg p-4 flex flex-col items-center"
                  >
                    <img
                      src={image}
                      alt={pokemon.name}
                      className="w-20 h-20 mb-2"
                    />
                    <p className="capitalize font-medium">{pokemon.name}</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No matches found.</p>
          )}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {data?.results.map((pokemon) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <Link
              to={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
              className="bg-white rounded-xl shadow hover:shadow-lg p-4 flex flex-col items-center"
            >
              <img src={image} alt={pokemon.name} className="w-20 h-20 mb-2" />
              <p className="capitalize font-medium">{pokemon.name}</p>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={loading || offset === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={loading || data?.next === null}
          className="px-4 py-2 bg-blue-500 text-white rounded
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-blue-600 disabled:hover:bg-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
