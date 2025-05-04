"use client";

import { useState, useEffect } from "react";
import { BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import dynamic from "next/dynamic";
import AxiosInstanceAny from "@/components/AxiosInstanceAny";

const PieChartComp = dynamic(() => import("./PieChart"), { ssr: false });

export default function CrimeChartSection({
  ntaname,
  showSeriousCrimes,
  setShowSeriousCrimes,
  selectedCrime,
  setSelectedCrime,
}: {
  ntaname: string;
  showSeriousCrimes: boolean;
  setShowSeriousCrimes: (val: boolean) => void;
  selectedCrime: string;
  setSelectedCrime: (val: string) => void;
}) {
  const [crimeBreakdown, setCrimeBreakdown] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  // Define a color palette
  const colorPalette = [
    "#FF6B6B", // Red
    "#FFD93D", // Yellow
    "#6BCB77", // Green
    "#4D96FF", // Blue
    "#845EC2", // Purple
  ];

  // Fetch crime breakdown data when ntaname or showSeriousCrimes changes
  useEffect(() => {
    const fetchCrimeBreakdown = async () => {
      setLoading(true);
      try {
        const endpoint = showSeriousCrimes
          ? `/safety/serious-crimes`
          : `/safety/crime-breakdown`;

        const response = await AxiosInstanceAny.get(endpoint, {
          params: { ntaname },
        });
        setCrimeBreakdown(response.data.crime_breakdown || {});
      } catch (error) {
        console.error("Failed to fetch crime breakdown:", error);
        setCrimeBreakdown({});
      } finally {
        setLoading(false);
      }
    };

    if (ntaname) {
      fetchCrimeBreakdown();
    }
  }, [ntaname, showSeriousCrimes]);

  // Convert crime breakdown into an array and sort by count
  const sortedCrimes = Object.entries(crimeBreakdown)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // Get the maximum count for scaling the bars
  const maxCrimeCount = Math.max(...sortedCrimes.map((crime) => crime.count), 1);

  // Assign colors to each crime category
  const crimesWithColors = sortedCrimes.map((crime, index) => ({
    ...crime,
    color: colorPalette[index % colorPalette.length], // Cycle through the color palette
  }));

  const handleCrimeSelection = (category: string) => {
    setSelectedCrime(category);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">
          <BarChart2 className="inline-block h-5 w-5 mr-2" />
          Crime Statistics
        </h2>

        <div className="flex items-center gap-2 text-white text-sm">
          <span>Show Serious Crimes Only</span>
          <Switch checked={showSeriousCrimes} onCheckedChange={setShowSeriousCrimes} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crime List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-white">Loading crime data...</p>
          ) : crimesWithColors.length === 0 ? (
            <p className="text-white">No crime data available for this area.</p>
          ) : (
            crimesWithColors.map((crime) => (
              <Card
                key={crime.category}
                className={`bg-white/10 border ${
                  selectedCrime === crime.category
                    ? "border-blue-400 ring-2 ring-blue-300"
                    : "border-white/20"
                } p-4 text-white cursor-pointer hover:bg-white/20 transition`}
                onClick={() => setSelectedCrime(crime.category)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{crime.category}</span>
                  <span className="font-bold text-lg">{crime.count}</span>
                </div>
                <div className="relative mt-2 h-4 bg-gray-700 rounded">
                  <div
                    style={{
                      width: `${(crime.count / maxCrimeCount) * 100}%`,
                      backgroundColor: crime.color, // Use the assigned color
                    }}
                    className="h-full rounded"
                  ></div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex items-center justify-center">
          {loading ? (
            <p className="text-white">Loading chart...</p>
          ) : (
            <PieChartComp
              data={crimesWithColors.map((crime) => ({
                category: crime.category, // Use 'category' for the pie chart
                count: crime.count,       // Use 'count' for the pie chart
                color: crime.color,       // Pass the color for consistent styling
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}