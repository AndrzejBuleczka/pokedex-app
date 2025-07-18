import { useParams } from "react-router-dom";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Details for {name}</h1>
    </div>
  );
}
