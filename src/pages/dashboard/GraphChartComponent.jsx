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
} from "recharts";
import { salesData } from "../../component/FakeData";

const COLORS = ["#1976d2", "#26a69a", "#ffa726", "#ab47bc", "#ef5350"];

const GraphChartComponent = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center", marginBottom: 10 }}>
        Sales by Category (Bar Graph)
      </h3>
      <ResponsiveContainer>
        <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#1976d2">
            {salesData.map((entry, index) => (
              <cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphChartComponent;
