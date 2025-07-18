import { useParams, Link } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import type { PokemonAbility, PokemonStat, PokemonType } from "../types/pokemon";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const { data: pokemon, loading, error } = usePokemonDetails(name || "");

  if (loading) return <p className="text-center p-6">Loading details...</p>;
  if (error) return <p className="text-center p-6 text-red-500">{error}</p>;

  const image = pokemon?.sprites.other["official-artwork"].front_default;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link
        to="/"
        className="inline-block mb-4 text-blue-600 hover:underline"
      >
        ← Back to List
      </Link>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col items-center mb-6">
          <img
            src={image}
            alt={pokemon?.name}
            className="w-40 h-40 mb-4"
          />
          <h1 className="text-3xl font-bold capitalize">{pokemon?.name}</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Types */}
          <div>
            <h2 className="font-semibold mb-2">Types:</h2>
            <div className="flex gap-2">
              {pokemon?.types.map((t: PokemonType) => (
                <span
                  key={t.type.name}
                  className="bg-gray-200 rounded px-3 py-1 capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div>
            <h2 className="font-semibold mb-2">Abilities:</h2>
            <ul className="list-disc list-inside">
              {pokemon?.abilities.map((a: PokemonAbility) => (
                <li key={a.ability.name} className="capitalize">
                  {a.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Stats:</h2>
          <div>
            {pokemon?.stats.map((s: PokemonStat) => (
              <div key={s.stat.name} className="flex justify-between mb-2">
                <span className="capitalize">{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
