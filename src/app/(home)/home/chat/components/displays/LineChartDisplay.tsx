import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface DataPoint {
  name: string;
  value: number;
}

export interface LineChartDisplayData {
  title: string;
  data: DataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  noBorder?: boolean;
}

export const LineChartDisplay: React.FC<LineChartDisplayData> = ({
  title,
  data,
  xAxisLabel,
  yAxisLabel,
  noBorder = false,
}) => {
  const chartContent = (
    <>
      {!noBorder && (
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold text-center">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      {noBorder && (
        <div className="mb-4 pb-2">
          <h3 className="text-lg font-semibold text-center text-gray-800">
            {title}
          </h3>
        </div>
      )}
      <div className="w-full mx-auto">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{
              top: 15,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{
                value: xAxisLabel,
                position: "insideBottom",
                offset: -15,
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
                offset: -5,
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: noBorder ? "none" : "0 4px 6px rgba(0,0,0,0.1)",
                border: noBorder ? "none" : "1px solid #f0f0f0",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  return noBorder ? (
    <div className="w-full p-4 bg-white rounded-lg">{chartContent}</div>
  ) : (
    <Card className="w-full border-gray-200 shadow-sm">
      <CardContent className="p-4 pt-6">{chartContent}</CardContent>
    </Card>
  );
};
