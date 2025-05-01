"use client"

import {BarChart2, TrendingDown, TrendingUp} from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import dynamic from "next/dynamic"

const PieChartComp = dynamic(() => import("./PieChart"), { ssr: false})

// PLACEHOLDER DATA
const mockCrimeData = [
  { category: "Theft", count: 99, trend: "down", percent: 12, serious: false },
  { category: "Assault", count: 43, trend: "up", percent: 5, serious: true },
  { category: "Burglary", count: 62, trend: "down", percent: 8, serious: true },
  { category: "Vehicle Crime", count: 89, trend: "down", percent: 15, serious: false },
  { category: "Robbery", count: 35, trend: "up", percent: 9, serious: true },
]


export default function CrimeChartSection({

  location,
  showSeriousCrimes,
  setShowSeriousCrimes,
  selectedCrime,
  setSelectedCrime,
  
}: {
  location: string
  showSeriousCrimes: boolean
  setShowSeriousCrimes: (val: boolean) => void
  selectedCrime: string
  setSelectedCrime: (val: string) => void
  
}) {
  const filteredCrimes = mockCrimeData
    .filter((crime) => !showSeriousCrimes || crime.serious)
    .slice(0, 5)

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
        <div className="space-y-4">
	
          {filteredCrimes.map((crime) => (
	  
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
                <div className="text-lg font-semibold flex items-center gap-2">
                  {crime.category}
                  <div className="relative pt-0.5 w-16">
                    <div className="overflow-hidden h-1 rounded bg-gray-700">
                      <div
                        style={{ width: `${Math.min((crime.count/150) * 100, 100)}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center h-full ${crime.trend === "down" ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                    </div>
                  </div>
                  <span className="font-bold text-lg">{crime.count}</span>
                </div>
                <div
                  className={`text-sm ${
                    crime.trend === "down" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {crime.trend === "down" ? <TrendingDown className="w-4 h-4 inline-block mr-1" /> : <TrendingUp className="w-4 h-4 inline-block mr-1" />}
                  {crime.percent}%
                </div>
              </div>
            </Card>
	    
          ))}
	  
        </div>

        <div className="bg-white/10 p-4 rounded-xl border border-white/20">
          <PieChartComp data={filteredCrimes} />
        </div>
      </div>
    </div>
  )
}