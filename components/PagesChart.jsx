'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from 'recharts';

const COLORS = [
  '#0085FF', // Blue
  '#00C29C', // Teal
  '#FBBF24', // Yellow / Amber
  '#FF8042', // Coral Orange
  '#FB0100', // Red
  '#A855F7', // Purple
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#6366F1', // Indigo
];

// Custom bell
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2 - width / 5},${y} ${x + width / 2},${y}
    C${x + width / 2 + width / 5},${y} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
    Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  if (!width || !height) return null;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CustomTopLabel = (props) => {
  const { x, y, width, value, index } = props;
  if (value === undefined || value === null) return null;
  const color = COLORS[index % COLORS.length];

  return (
    <text
      x={x + width / 2}
      y={y - 10}
      fill={color}
      textAnchor="middle"
      fontSize={13}
      fontWeight="700"
      className="font-sans"
    >
      {value}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 text-xs sm:text-sm">
        <p className="font-bold text-gray-900 mb-1">{data.bookName}</p>
        <p className="text-gray-600">
          Pages: <span className="font-semibold text-[#23BE0A]">{data.totalPages}</span>
        </p>
        <p className="text-gray-600">
          Category: <span className="font-medium">{data.category}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function PagesChart({ books }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[450px] sm:h-[520px] bg-[#F3F3F3] rounded-3xl flex items-center justify-center animate-pulse">
        <span className="text-gray-400 font-medium">Loading chart...</span>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="w-full h-[400px] bg-[#F3F3F3] rounded-3xl flex items-center justify-center">
        <p className="text-gray-500 font-medium text-lg">No book page data available.</p>
      </div>
    );
  }

  // Format book titles for XAxis ticks (truncate long titles nicely)
  const chartData = books.map((b) => ({
    ...b,
    shortTitle: b.bookName.length > 16 ? `${b.bookName.slice(0, 14)}...` : b.bookName,
  }));

  // Find max pages to set nice upper domain limit
  const maxPages = Math.max(...books.map((b) => b.totalPages || 0), 340);
  const yDomainMax = Math.ceil(maxPages / 85) * 85;

  return (
    <div className="w-full bg-[#F3F3F3] rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 overflow-x-auto">
      <div className="min-w-[600px] sm:min-w-full h-[460px] sm:h-[540px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 30,
              right: 20,
              left: 0,
              bottom: 40,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#D4D4D8"
              opacity={0.8}
            />
            <XAxis
              dataKey="shortTitle"
              tickLine={false}
              axisLine={{ stroke: '#E4E4E7' }}
              tick={{ fill: '#71717A', fontSize: 12, fontWeight: 500 }}
              dy={15}
            />
            <YAxis
              domain={[0, yDomainMax]}
              tickCount={5}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#71717A', fontSize: 13, fontWeight: 500 }}
              tickFormatter={(val) => (val === 0 ? '00' : val.toString())}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar
              dataKey="totalPages"
              shape={<TriangleBar />}
              isAnimationActive={true}
              animationDuration={900}
            >
              <LabelList dataKey="totalPages" position="top" content={<CustomTopLabel />} />
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
