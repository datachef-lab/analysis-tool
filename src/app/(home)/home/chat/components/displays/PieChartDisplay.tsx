import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface DataPoint {
  name: string;
  value: number;
}

export interface PieChartDisplayData {
  title: string;
  data: DataPoint[];
  noBorder?: boolean;
}

export const PieChartDisplay: React.FC<PieChartDisplayData> = ({
  title,
  data,
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
      <div className={`mb-4 ${noBorder ? "" : "pb-2"}`}>
        <h3 className="text-lg font-semibold text-center text-gray-700">
          {title}
        </h3>
      </div>
      <div className="w-full max-w-md mx-auto" style={{ height: "280px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}`, `${name}`]}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: noBorder ? "none" : "0 4px 6px rgba(0,0,0,0.1)",
                border: noBorder ? "none" : "1px solid #f0f0f0",
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center mt-4 gap-3">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-1.5">
            <Badge
              className="h-5 px-2 font-normal"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            >
              {entry.name}: {entry.value}
            </Badge>
          </div>
        ))}
      </div>
    </>
  );

  return noBorder ? (
    <div className="w-full p-4 bg-white rounded-lg">{chartContent}</div>
  ) : (
    <Card className="w-full border-gray-200 shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold text-center text-gray-700">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="w-full max-w-md mx-auto" style={{ height: "280px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}`, `${name}`]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: "1px solid #f0f0f0",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center mt-4 gap-3">
          {data.map((entry, index) => (
            <Badge
              key={`badge-${index}`}
              className="h-5 px-2 font-normal"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            >
              {entry.name}: {entry.value}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
