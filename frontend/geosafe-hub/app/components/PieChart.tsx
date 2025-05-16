"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function PieChartComp({
  data,
}: {
  data: { category: string; count: number; color: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius="80%"
          fill="#8884d8"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry) => (
        <Cell key={entry.category} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
