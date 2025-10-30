import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { salesData } from "../../component/FakeData";

const COLORS = ["#1976d2", "#26a69a", "#ffa726", "#ab47bc", "#ef5350"];

const DonutChartComponent = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center", marginBottom: 10 }}>Sales by Category (Donut)</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={salesData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label
          >
            {salesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChartComponent;
