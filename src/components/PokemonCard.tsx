import { Link } from "react-router-dom";

type PokemonCardProps = {
  pokemon: {
    name: string;
  };
  image: string;
};

function PokemonCard({ pokemon, image }: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
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
}

export default PokemonCard;