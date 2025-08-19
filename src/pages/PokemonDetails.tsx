import { useParams, useNavigate } from "react-router-dom";
import PokemonPolarChart from "../components/PokemonPolarChart";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import type { PokemonAbility, PokemonType } from "../types/pokemon";
import { getTypeColor } from "../utils/colors";
import TypeEffectivenessHeatmap from "../components/TypeEffectivenessHeatmap";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const { data: pokemon, loading, error } = usePokemonDetails(name || "");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <p className="text-center p-6">Loading details...</p>;
  if (error) return <p className="text-center p-6 text-red-500">{error}</p>;

  const image = pokemon?.sprites.other["official-artwork"].front_default;

  return (
    <div className="fixed inset-0 bg-white/95 z-50 overflow-auto flex items-center justify-center">
      <div className="relative w-full max-w-2xl mx-auto p-6">
        <button
          onClick={handleBack}
          className="absolute left-6 top-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to List
        </button>

        <div className="bg-white rounded-xl shadow p-8 pt-16">
          <div className="flex flex-col items-center mb-6">
            <img src={image} alt={pokemon?.name} className="w-40 h-40 mb-4" />
            <h1 className="text-3xl font-bold capitalize">{pokemon?.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold mb-2">Types:</h2>
              <div className="flex gap-2 flex-wrap">
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
            {pokemon?.stats && (
              <PokemonPolarChart
                stats={pokemon.stats}
                typeColor={getTypeColor(pokemon.types[0].type.name)}
              />
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Type Effectiveness:</h2>
            {pokemon?.types && (
              <TypeEffectivenessHeatmap types={pokemon.types} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
