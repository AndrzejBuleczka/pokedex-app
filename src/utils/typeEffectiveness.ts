export const allTypes = [
  "normal","fire","water","electric","grass","ice","fighting","poison","ground",
  "flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"
];

// Fetch and merge damage relations for given Pokémon types
export async function getTypeMultipliers(types: string[]): Promise<Record<string, number>> {
  // Initialize multipliers as 1x for all types
  const multipliers: Record<string, number> = {};
  allTypes.forEach((t) => (multipliers[t] = 1));

  for (const type of types) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();

    // Apply multipliers
    data.damage_relations.double_damage_from.forEach((d: { name: string }) => {
      multipliers[d.name] *= 2;
    });
    data.damage_relations.half_damage_from.forEach((d: { name: string }) => {
      multipliers[d.name] *= 0.5;
    });
    data.damage_relations.no_damage_from.forEach((d: { name: string }) => {
      multipliers[d.name] *= 0;
    });
  }

  return multipliers;
}
