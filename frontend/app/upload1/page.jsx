"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";

// =========================================================
// MOCK STATIC DATA (Adheres perfectly to Pydantic Schemas)
// =========================================================
const MOCK_STATIC_DATA = {
  overview: {
    rows: 15000,
    columns: 6,
    missing_values: 142,
    duplicate_rows: 18,
  },
  data_quality: [
    { column: "price", missing: 0, percent: 0.0 },
    { column: "sqft", missing: 12, percent: 0.08 },
    { column: "bedrooms", missing: 0, percent: 0.0 },
    { column: "neighborhood", missing: 130, percent: 0.86 },
    { column: "year_built", missing: 0, percent: 0.0 },
    { column: "condition_score", missing: 0, percent: 0.0 },
  ],
  basic_summary: [
    { column: "price", type: "float64", nulls: 0, unique: 4521 },
    { column: "sqft", type: "int64", nulls: 12, unique: 1120 },
    { column: "bedrooms", type: "int64", nulls: 0, unique: 7 },
    { column: "neighborhood", type: "object", nulls: 130, unique: 15 },
    { column: "year_built", type: "int64", nulls: 0, unique: 105 },
    { column: "condition_score", type: "float64", nulls: 0, unique: 5 },
  ],
  numerical_analysis: {
    price: { min: 150000, max: 2500000, mean: 580000, median: 510000, std: 240000 },
    sqft: { min: 600, max: 7500, mean: 2200, median: 1950, std: 850 },
    bedrooms: { min: 1, max: 8, mean: 3.4, median: 3.0, std: 1.1 },
    year_built: { min: 1900, max: 2024, mean: 1985, median: 1995, std: 28 },
    condition_score: { min: 1.0, max: 5.0, mean: 3.8, median: 4.0, std: 0.9 },
  },
  categorical_analysis: {
    neighborhood: {
      value_counts: {
        "Downtown": 4500,
        "Suburbia North": 3800,
        "West End": 2200,
        "Lakeside": 1500,
        "Historic District": 900,
      },
      top_category: "Downtown",
      top_freq_percent: 30.0,
    },
  },
  outliers: {
    price: 342,
    sqft: 185,
    bedrooms: 12,
    year_built: 0,
    condition_score: 45,
  },
  distribution: {
    price: { skewness: 1.85, shape: "Highly Right Skewed" },
    sqft: { skewness: 1.42, shape: "Right Skewed" },
    bedrooms: { skewness: 0.35, shape: "Approximately Symmetric" },
    year_built: { skewness: -0.65, shape: "Left Skewed" },
    condition_score: { skewness: -1.1, shape: "Left Skewed" },
  },
  correlations: {
    matrix: {}, // Full matrix omitted for brevity, handled by heatmap
    strong_relationships: [
      { feature_1: "price", feature_2: "sqft", correlation: 0.88 },
      { feature_1: "price", feature_2: "bedrooms", correlation: 0.65 },
      { feature_1: "sqft", feature_2: "bedrooms", correlation: 0.72 },
    ],
  },
  feature_importance: [
    { feature: "sqft", importance: 0.48 },
    { feature: "neighborhood", importance: 0.28 },
    { feature: "year_built", importance: 0.12 },
    { feature: "bedrooms", importance: 0.08 },
    { feature: "condition_score", importance: 0.04 },
  ],
  preview: [
    { price: 450000, sqft: 2100, bedrooms: 3, neighborhood: "Suburbia North", year_built: 2005, condition_score: 4.0 },
    { price: 1250000, sqft: 3800, bedrooms: 5, neighborhood: "Downtown", year_built: 2018, condition_score: 5.0 },
    { price: 280000, sqft: 1200, bedrooms: 2, neighborhood: "West End", year_built: 1965, condition_score: 3.0 },
    { price: 850000, sqft: 2800, bedrooms: 4, neighborhood: "Lakeside", year_built: 2010, condition_score: 4.5 },
    { price: 175000, sqft: 950, bedrooms: 1, neighborhood: "Historic District", year_built: 1920, condition_score: 2.5 },
  ],
  charts: {
    histograms: {
      price: [
        { range: "150k-400k", count: 4200 },
        { range: "400k-650k", count: 6500 },
        { range: "650k-900k", count: 2800 },
        { range: "900k-1.15M", count: 1000 },
        { range: "1.15M+", count: 500 },
      ],
      sqft: [
        { range: "600-1500", count: 3500 },
        { range: "1500-2400", count: 7000 },
        { range: "2400-3300", count: 3000 },
        { range: "3300-4200", count: 1000 },
        { range: "4200+", count: 500 },
      ]
    },
    category_bars: {
      neighborhood: [
        { category: "Downtown", count: 4500 },
        { category: "Suburbia N.", count: 3800 },
        { category: "West End", count: 2200 },
        { category: "Lakeside", count: 1500 },
        { category: "Historic", count: 900 },
      ],
    },
    scatter_plots: {
      "Price vs Square Footage": [
        { x: 1200, y: 280000 },
        { x: 1800, y: 390000 },
        { x: 2100, y: 450000 },
        { x: 2500, y: 620000 },
        { x: 2800, y: 850000 },
        { x: 3800, y: 1250000 },
        { x: 4500, y: 1600000 },
        { x: 5200, y: 2100000 },
      ],
    },
    heatmap: [
      { x: "price", y: "price", value: 1.0 },
      { x: "price", y: "sqft", value: 0.88 },
      { x: "price", y: "beds", value: 0.65 },
      { x: "sqft", y: "price", value: 0.88 },
      { x: "sqft", y: "sqft", value: 1.0 },
      { x: "sqft", y: "beds", value: 0.72 },
      { x: "beds", y: "price", value: 0.65 },
      { x: "beds", y: "sqft", value: 0.72 },
      { x: "beds", y: "beds", value: 1.0 },
    ],
    outlier_boxplots: {
      price: { min: 150000, q1: 350000, median: 510000, q3: 750000, max: 2500000 },
      sqft: { min: 600, q1: 1400, median: 1950, q3: 2800, max: 7500 },
    },
    feature_importance_chart: [
      { feature: "sqft", importance: 0.48 },
      { feature: "neighborhood", importance: 0.28 },
      { feature: "year_built", importance: 0.12 },
      { feature: "bedrooms", importance: 0.08 },
    ],
  },
};

// Utility for formatting numbers
const formatNum = (num) => (typeof num === "number" ? (Number.isInteger(num) ? num : num.toFixed(2)) : num);

export default function DatasetDashboard({ data = MOCK_STATIC_DATA }) {
  if (!data) return <div className="p-4 text-white bg-black min-h-screen">No data provided.</div>;

  const {
    overview,
    data_quality,
    basic_summary,
    numerical_analysis,
    categorical_analysis,
    outliers,
    distribution,
    correlations,
    feature_importance,
    preview,
    charts,
  } = data;

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans selection:bg-zinc-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER & OVERVIEW */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dataset Analysis Report</h1>
          <p className="text-zinc-400">Rendering with static analysis data. Ready for API integration.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <OverviewCard title="Total Rows" value={overview.rows} />
            <OverviewCard title="Total Columns" value={overview.columns} />
            <OverviewCard title="Missing Values" value={overview.missing_values} />
            <OverviewCard title="Duplicate Rows" value={overview.duplicate_rows} />
          </div>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="bg-zinc-900 border border-zinc-800 text-zinc-400">
            <TabsTrigger value="summary" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Summary & Quality</TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Statistics & Distrib.</TabsTrigger>
            <TabsTrigger value="relationships" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Correlations</TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Visualizations</TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Data Preview</TabsTrigger>
          </TabsList>

          {/* TAB 1: SUMMARY & QUALITY */}
          <TabsContent value="summary" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-black border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Data Quality</CardTitle>
                  <CardDescription className="text-zinc-400">Missing values by column</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader className="border-zinc-800">
                        <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                          <TableHead className="text-zinc-400">Column</TableHead>
                          <TableHead className="text-zinc-400 text-right">Missing</TableHead>
                          <TableHead className="text-zinc-400 text-right">%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data_quality.map((item) => (
                          <TableRow key={item.column} className="border-zinc-800 hover:bg-zinc-900">
                            <TableCell className="font-medium">{item.column}</TableCell>
                            <TableCell className="text-right">{item.missing}</TableCell>
                            <TableCell className="text-right">{formatNum(item.percent)}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-black border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Basic Summary</CardTitle>
                  <CardDescription className="text-zinc-400">Types, nulls, and unique counts</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader className="border-zinc-800">
                        <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                          <TableHead className="text-zinc-400">Column</TableHead>
                          <TableHead className="text-zinc-400">Type</TableHead>
                          <TableHead className="text-zinc-400 text-right">Nulls</TableHead>
                          <TableHead className="text-zinc-400 text-right">Unique</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {basic_summary.map((item) => (
                          <TableRow key={item.column} className="border-zinc-800 hover:bg-zinc-900">
                            <TableCell className="font-medium">{item.column}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-zinc-300 border-zinc-700">{item.type}</Badge>
                            </TableCell>
                            <TableCell className="text-right">{item.nulls}</TableCell>
                            <TableCell className="text-right">{item.unique.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 2: STATISTICS & DISTRIBUTIONS */}
          <TabsContent value="stats" className="space-y-4 mt-4">
            <Card className="bg-black border-zinc-800 text-white">
              <CardHeader>
                <CardTitle>Numerical Analysis & Distributions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader className="border-zinc-800">
                      <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                        <TableHead className="text-zinc-400">Column</TableHead>
                        <TableHead className="text-zinc-400 text-right">Min</TableHead>
                        <TableHead className="text-zinc-400 text-right">Max</TableHead>
                        <TableHead className="text-zinc-400 text-right">Mean</TableHead>
                        <TableHead className="text-zinc-400 text-right">Median</TableHead>
                        <TableHead className="text-zinc-400 text-right">Std Dev</TableHead>
                        <TableHead className="text-zinc-400 text-right">Outliers</TableHead>
                        <TableHead className="text-zinc-400 text-right">Skewness</TableHead>
                        <TableHead className="text-zinc-400 text-right">Shape</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(numerical_analysis).map(([col, stats]) => (
                        <TableRow key={col} className="border-zinc-800 hover:bg-zinc-900">
                          <TableCell className="font-medium">{col}</TableCell>
                          <TableCell className="text-right">{formatNum(stats.min)}</TableCell>
                          <TableCell className="text-right">{formatNum(stats.max)}</TableCell>
                          <TableCell className="text-right">{formatNum(stats.mean)}</TableCell>
                          <TableCell className="text-right">{formatNum(stats.median)}</TableCell>
                          <TableCell className="text-right">{formatNum(stats.std)}</TableCell>
                          <TableCell className="text-right">{outliers[col] || 0}</TableCell>
                          <TableCell className="text-right">{formatNum(distribution[col]?.skewness)}</TableCell>
                          <TableCell className="text-right">{distribution[col]?.shape || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-black border-zinc-800 text-white">
              <CardHeader>
                <CardTitle>Categorical Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(categorical_analysis).map(([col, stats]) => (
                    <div key={col} className="p-4 border border-zinc-800 rounded-md bg-zinc-950">
                      <h4 className="font-semibold mb-2">{col}</h4>
                      <div className="text-sm text-zinc-400 flex justify-between mb-2">
                        <span>Top Category: <strong className="text-white">{stats.top_category || "N/A"}</strong></span>
                        <span>{formatNum(stats.top_freq_percent)}%</span>
                      </div>
                      <div className="text-xs text-zinc-500 space-y-1">
                        {Object.entries(stats.value_counts).slice(0, 5).map(([val, count]) => (
                          <div key={val} className="flex justify-between">
                            <span>{val}</span>
                            <span>{count.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: CORRELATIONS & FEATURE IMPORTANCE */}
          <TabsContent value="relationships" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-black border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Strong Correlations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader className="border-zinc-800">
                      <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                        <TableHead className="text-zinc-400">Feature 1</TableHead>
                        <TableHead className="text-zinc-400">Feature 2</TableHead>
                        <TableHead className="text-zinc-400 text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {correlations.strong_relationships.map((rel, idx) => (
                        <TableRow key={idx} className="border-zinc-800 hover:bg-zinc-900">
                          <TableCell>{rel.feature_1}</TableCell>
                          <TableCell>{rel.feature_2}</TableCell>
                          <TableCell className="text-right font-mono">{formatNum(rel.correlation)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="bg-black border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Feature Importance</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feature_importance} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                      <XAxis type="number" stroke="#a1a1aa" />
                      <YAxis dataKey="feature" type="category" stroke="#a1a1aa" fontSize={12} />
                      <Tooltip cursor={{ fill: '#27272a' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                      <Bar dataKey="importance" fill="#ffffff" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 4: CHARTS */}
          <TabsContent value="charts" className="space-y-6 mt-4">
            
            {/* Histograms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(charts.histograms || {}).map(([col, data]) => (
                <ChartCard key={col} title={`${col} Distribution (Histogram)`}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="range" stroke="#a1a1aa" fontSize={12} />
                    <YAxis stroke="#a1a1aa" fontSize={12} />
                    <Tooltip cursor={{ fill: '#27272a' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                    <Bar dataKey="count" fill="#ffffff" />
                  </BarChart>
                </ChartCard>
              ))}
            </div>

            {/* Category Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(charts.category_bars || {}).map(([col, data]) => (
                <ChartCard key={col} title={`${col} Frequencies`}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="category" stroke="#a1a1aa" fontSize={12} />
                    <YAxis stroke="#a1a1aa" fontSize={12} />
                    <Tooltip cursor={{ fill: '#27272a' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                    <Bar dataKey="count" fill="#a3a3a3" />
                  </BarChart>
                </ChartCard>
              ))}
            </div>

            {/* Scatter Plots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(charts.scatter_plots || {}).map(([name, data]) => (
                <ChartCard key={name} title={name}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke="#27272a" />
                    <XAxis dataKey="x" type="number" name="X" stroke="#a1a1aa" />
                    <YAxis dataKey="y" type="number" name="Y" stroke="#a1a1aa" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                    <Scatter name={name} data={data} fill="#ffffff" />
                  </ScatterChart>
                </ChartCard>
              ))}
            </div>

            {/* Custom BoxPlots (CSS Based since Recharts lacks native boxplot) */}
            <Card className="bg-black border-zinc-800 text-white">
              <CardHeader><CardTitle>Outlier BoxPlots</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(charts.outlier_boxplots || {}).map(([col, box]) => (
                  <div key={col} className="p-4 border border-zinc-800 rounded-lg flex flex-col items-center">
                    <h4 className="mb-4 text-sm font-semibold">{col}</h4>
                    <div className="relative w-full h-8 flex items-center px-4">
                      {/* Whisker Line */}
                      <div className="absolute left-4 right-4 h-px bg-zinc-600 top-1/2" />
                      {/* Box (Q1 to Q3) */}
                      <div 
                        className="absolute h-full bg-zinc-800 border-2 border-white top-0" 
                        style={{
                          left: `${((box.q1 - box.min) / (box.max - box.min)) * 100}%`,
                          width: `${((box.q3 - box.q1) / (box.max - box.min)) * 100}%`
                        }}
                      >
                         {/* Median Line */}
                        <div 
                          className="absolute w-1 bg-white h-full top-0" 
                          style={{ left: `${((box.median - box.q1) / (box.q3 - box.q1)) * 100}%` }} 
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-between text-xs text-zinc-500 mt-2">
                      <span>{formatNum(box.min)} (Min)</span>
                      <span>{formatNum(box.max)} (Max)</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Heatmap (CSS Grid Approximation) */}
            <Card className="bg-black border-zinc-800 text-white">
              <CardHeader><CardTitle>Correlation Heatmap</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {charts.heatmap?.map((item, idx) => {
                    // Map value (0 to 1) to opacity of white (adjusted for dark theme contrast)
                    const intensity = Math.abs(item.value);
                    return (
                      <div 
                        key={idx} 
                        className="w-24 h-24 border border-zinc-800 flex flex-col items-center justify-center text-xs p-1 text-center transition-colors"
                        style={{ backgroundColor: `rgba(255, 255, 255, ${intensity * 0.9})` }}
                      >
                        <span className="mix-blend-difference text-white font-bold">{item.x} x {item.y}</span>
                        <span className="mix-blend-difference text-white">{formatNum(item.value)}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

          </TabsContent>

          {/* TAB 5: PREVIEW ROW */}
          <TabsContent value="preview" className="space-y-4 mt-4">
            <Card className="bg-black border-zinc-800 text-white overflow-hidden">
              <CardHeader>
                <CardTitle>Dataset Preview</CardTitle>
                <CardDescription className="text-zinc-400">First few rows of the dataset</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="w-full overflow-x-auto">
                  <Table className="w-full min-w-max">
                    <TableHeader className="border-zinc-800 bg-zinc-950">
                      <TableRow className="border-zinc-800">
                        {Object.keys(preview[0] || {}).map((key) => (
                          <TableHead key={key} className="text-zinc-400 px-4 py-2 capitalize">{key.replace('_', ' ')}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.map((row, i) => (
                        <TableRow key={i} className="border-zinc-800 hover:bg-zinc-900">
                          {Object.values(row).map((val, j) => (
                            <TableCell key={j} className="px-4 py-2">
                              {typeof val === 'number' ? formatNum(val) : String(val)}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

// Sub-components
function OverviewCard({ title, value }) {
  return (
    <Card className="bg-black border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400 uppercase">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value.toLocaleString()}</div>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, children }) {
  return (
    <Card className="bg-black border-zinc-800 text-white h-[350px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}