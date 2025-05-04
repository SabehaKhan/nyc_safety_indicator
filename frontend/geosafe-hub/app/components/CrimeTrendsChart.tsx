"use client";

import { useEffect, useState } from "react";
import AxiosInstanceAny from "@/components/AxiosInstanceAny";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CrimeBarChart({
  location,
  selectedCrime,
}: {
  location: string;
  selectedCrime: string;
}) {
  const [crimeData, setCrimeData] = useState<{ NYC: number; Neighborhood: number } | null>(null);

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await AxiosInstanceAny.get(`/safety/crime-trends`, {
          params: { ntaname: location },
        });

        // Extract data for the selected crime
        const crimeTrends = response.data[selectedCrime];
        if (crimeTrends && crimeTrends.length > 0) {
          const { NYC, Neighborhood } = crimeTrends[0];
          setCrimeData({ NYC, Neighborhood });
        } else {
          setCrimeData(null); // No data for the selected crime
        }
      } catch (error) {
        console.error("Failed to fetch crime data:", error);
        setCrimeData(null);
      }
    };

    if (location && selectedCrime) {
      fetchCrimeData();
    }
  }, [location, selectedCrime]);

  // Prepare data for Chart.js
  const chartData = {
    labels: ["NYC", location],
    datasets: [
      {
        label: selectedCrime,
        data: crimeData ? [crimeData.NYC, crimeData.Neighborhood] : [0, 0],
        backgroundColor: ["#34D399", "#60A5FA"],
        borderColor: ["#34D399", "#60A5FA"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw} crimes`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#ddd",
        },
        ticks: {
          color: "#ddd",
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4">
        {selectedCrime} Comparison
      </h2>

      <div className="bg-white/10 p-4 rounded-xl border border-white/20">
        {crimeData ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p className="text-white">No data available for the selected crime.</p>
        )}
      </div>
    </div>
  );
}