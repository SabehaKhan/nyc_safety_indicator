"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp } from "lucide-react"

//PLACEHOLDER DATA
const staticTrendData = {
  Theft: [
    { year: "2020", NYC: 200, Neighborhood: 150 },
    { year: "2021", NYC: 190, Neighborhood: 140 },
    { year: "2022", NYC: 210, Neighborhood: 130 },
    { year: "2023", NYC: 220, Neighborhood: 125 },
    { year: "2024", NYC: 200, Neighborhood: 127 },
  ],
  Assault: [
    { year: "2020", NYC: 100, Neighborhood: 40 },
    { year: "2021", NYC: 95, Neighborhood: 38 },
    { year: "2022", NYC: 90, Neighborhood: 45 },
    { year: "2023", NYC: 105, Neighborhood: 50 },
    { year: "2024", NYC: 110, Neighborhood: 43 },
  ],
  Burglary: [
    { year: "2020", NYC: 130, Neighborhood: 70 },
    { year: "2021", NYC: 125, Neighborhood: 68 },
    { year: "2022", NYC: 120, Neighborhood: 64 },
    { year: "2023", NYC: 115, Neighborhood: 60 },
    { year: "2024", NYC: 110, Neighborhood: 62 },
  ],
  "Vehicle Crime": [
    { year: "2020", NYC: 160, Neighborhood: 85 },
    { year: "2021", NYC: 165, Neighborhood: 88 },
    { year: "2022", NYC: 170, Neighborhood: 82 },
    { year: "2023", NYC: 175, Neighborhood: 80 },
    { year: "2024", NYC: 180, Neighborhood: 89 },
  ],
  Robbery: [
    { year: "2020", NYC: 90, Neighborhood: 30 },
    { year: "2021", NYC: 85, Neighborhood: 33 },
    { year: "2022", NYC: 95, Neighborhood: 32 },
    { year: "2023", NYC: 100, Neighborhood: 34 },
    { year: "2024", NYC: 105, Neighborhood: 35 },
  ],
}


export default function CrimeLineGraph({
  location,
  selectedCrime,
  
}: {
  location: string
  selectedCrime: string
  
}) {
  const data = staticTrendData[selectedCrime] || []

  return (
  
    //remember might adjust header later
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4">
        <TrendingUp className="inline-block h-5 w-5 mr-2" />
        {selectedCrime} Trends (2020–2024)
      </h2>

      <div className="bg-white/10 p-4 rounded-xl border border-white/20">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip />
            <Legend />
	    
            <Line
              type="monotone"
              dataKey="Neighborhood"
              stroke="#60A5FA"
              strokeWidth={3}
              dot={{ r: 5 }}
              name={`${location}`}
            />
	    
            <Line
              type="monotone"
              dataKey="NYC"
              stroke="#34D399"
              strokeWidth={2}
              name="NYC Overall"
            />
	    
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
