import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-more";
import type { PokemonStat } from "../types/pokemon";

// Initialize radar chart support


type Props = {
  stats: PokemonStat[];
  typeColor?: string; // Optional color based on Pokémon type
};

const statLabels = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed"
];

export default function PokemonPolarChart({ stats, typeColor = "#4f46e5" }: Props) {
  const chartStats = statLabels.map((label) => {
    const found = stats.find((s) => s.stat.name === label);
    return found?.base_stat || 0;
  });

  const options: Highcharts.Options = {
    chart: {
      polar: true,
      type: "line",
      backgroundColor: "transparent",
      height: 350,
    },
    title: { text: "Base Stats", style: { display: "none" } },
    pane: { size: "80%" },
    xAxis: {
      categories: statLabels.map((l) => l.replace("-", " ")),
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: { style: { fontWeight: "500" } }
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 160,
      tickInterval: 40,
    },
    tooltip: {
      shared: true,
      pointFormat: "<span style=\"color:{series.color}\">{point.category}</span>: <b>{point.y}</b><br/>",
    },
    series: [
      {
        name: "Base Stat",
        data: chartStats,
        type: "line",
        color: typeColor,
        pointPlacement: "on",
        lineWidth: 2,
      }
    ],
    credits: { enabled: false },
    legend: { enabled: false }
  };

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
