import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/heatmap";
import type { PokemonType } from "../types/pokemon";
import { allTypes, getTypeMultipliers } from "../utils/typeEffectiveness";

type Props = {
  types: PokemonType[];
};

export default function TypeEffectivenessHeatmap({ types }: Props) {
  const [multipliers, setMultipliers] = useState<Record<string, number> | null>(
    null
  );

  useEffect(() => {
    const load = async () => {
      const typeNames = types.map((t) => t.type.name);
      const result = await getTypeMultipliers(typeNames);
      setMultipliers(result);
    };
    load();
  }, [types]);

  if (!multipliers) {
    return (
      <p className="text-center text-gray-500">Loading type effectiveness...</p>
    );
  }

  const options: Highcharts.Options = {
    chart: {
      type: "heatmap",
      backgroundColor: "transparent",
      height: 120
    },
    title: { text: "" },
    xAxis: {
      categories: allTypes,
      labels: { style: { fontSize: "10px" } }
    },
    yAxis: {
      categories: [types.map((t) => t.type.name).join(" / ")],
      title: null
    },
    colorAxis: {
      stops: [
        [0, "#22c55e"], // resistance (0x – 0.5x)
        [0.5, "#e5e7eb"], // neutral (1x)
        [1, "#ef4444"] // weakness (2x+)
      ],
      min: 0,
      max: 4
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.series.xAxis.categories[this.x]}</b>: ${this.value}x`;
      }
    },
    series: [
      {
        name: "Effectiveness",
        type: "heatmap",
        data: allTypes.map((t, i) => [i, 0, multipliers[t]]),
        dataLabels: {
          enabled: true,
          format: "{point.value}x",
          style: { fontSize: "10px" }
        }
      }
    ],
    credits: { enabled: false },
    legend: { enabled: false }
  };

  return (
    <div className="mt-6">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
