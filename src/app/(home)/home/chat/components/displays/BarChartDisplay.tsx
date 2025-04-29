import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface DataPoint {
  name: string;
  value: number;
}

export interface BarChartDisplayData {
  title: string;
  data: DataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  noBorder?: boolean;
}

export const BarChartDisplay: React.FC<BarChartDisplayData> = ({
  title,
  data,
  xAxisLabel,
  yAxisLabel,
  noBorder = false,
}) => {
  // Use a softer color palette
  const COLORS = [
    "#6366f1", // indigo
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ec4899", // pink
    "#8b5cf6", // violet
    "#14b8a6", // teal
  ];

  const chartContent = (
    <>
      {!noBorder && (
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold text-center text-gray-700">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      {noBorder && (
        <div className="mb-4 pb-2">
          <h3 className="text-lg font-semibold text-center text-gray-700">
            {title}
          </h3>
        </div>
      )}
      <div className="w-full mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 15,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              label={{
                value: xAxisLabel,
                position: "insideBottom",
                offset: -15,
                fill: "#6b7280",
              }}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
                offset: -5,
                fill: "#6b7280",
              }}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: noBorder ? "none" : "0 4px 6px rgba(0,0,0,0.1)",
                border: noBorder ? "none" : "1px solid #f0f0f0",
                color: "#4b5563",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px", color: "#6b7280" }} />
            <Bar dataKey="value" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  return noBorder ? (
    <div className="w-full p-3 bg-white rounded-lg">{chartContent}</div>
  ) : (
    <Card className="w-full border-gray-200 shadow-sm">
      <CardContent className="p-4 pt-6">{chartContent}</CardContent>
    </Card>
  );
};
