export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    fire: "#f87171",
    water: "#60a5fa",
    grass: "#4ade80",
    electric: "#facc15",
    psychic: "#e879f9",
    ice: "#67e8f9",
    dragon: "#818cf8",
    dark: "#6b7280",
    fairy: "#f9a8d4",
    normal: "#a3a3a3",
    fighting: "#f97316",
    flying: "#93c5fd",
    poison: "#c084fc",
    ground: "#fcd34d",
    rock: "#d1d5db",
    bug: "#bef264",
    ghost: "#a78bfa",
    steel: "#9ca3af"
  };

  return typeColors[type] || "#4f46e5"; // fallback color (indigo-600)
};