"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, ScatterChart, Scatter, ZAxis
} from "recharts";
import { 
  Database, Rows, Columns, Activity, AlertCircle, FileText, CheckCircle2, 
  TrendingUp, BarChart2, GitCommit, Layers
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// --- ANIMATION CONFIG ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// --- MOCK DATA ---
const mockData = {
  overview: { rows: 14500, columns: 24, missing_values: 342, duplicate_rows: 12, data_quality_score: 92 },
  data_quality: [
    { column: "Age", missing: 0, percent: 0.0 },
    { column: "Address", missing: 342, percent: 2.3 },
    { column: "Salary", missing: 15, percent: 0.1 }
  ],
  basic_summary: [
    { column: "Age", type: "integer", nulls: 0, unique: 45 },
    { column: "Department", type: "string", nulls: 0, unique: 6 },
    { column: "Salary", type: "float", nulls: 15, unique: 1200 }
  ],
  numerical_analysis: {
    Age: { min: 22.0, max: 65.0, mean: 38.4, median: 36.0, std: 8.2 },
    Salary: { min: 45000.0, max: 250000.0, mean: 85000.0, median: 82000.0, std: 24000.0 },
    Experience: { min: 0.0, max: 40.0, mean: 12.5, median: 10.0, std: 7.1 }
  },
  categorical_analysis: {
    Department: { value_counts: { Engineering: 450, Sales: 320, HR: 80, Marketing: 150 }, top_category: "Engineering", top_freq_percent: 45.0 },
    Gender: { value_counts: { Male: 600, Female: 380, Other: 20 }, top_category: "Male", top_freq_percent: 60.0 }
  },
  outliers: { Age: 12, Salary: 45, Experience: 3 },
  distribution: {
    Age: { skewness: 0.45, shape: "Right Skewed" },
    Salary: { skewness: 1.2, shape: "Highly Right Skewed" }
  },
  correlations: {
    matrix: {
      Age: { Age: 1.0, Salary: 0.65, Experience: 0.92 },
      Salary: { Age: 0.65, Salary: 1.0, Experience: 0.85 },
      Experience: { Age: 0.92, Salary: 0.85, Experience: 1.0 }
    },
    strong_relationships: [
      { feature_1: "Age", feature_2: "Experience", correlation: 0.92 },
      { feature_1: "Experience", feature_2: "Salary", correlation: 0.85 }
    ]
  },
  insights: [
    { title: "High Attrition in Sales", description: "The sales department shows a 15% higher attrition rate than the company average.", type: "warning" },
    { title: "Salary vs Experience Correlation", description: "Strong positive correlation (0.85) between years of experience and base salary.", type: "positive" },
    { title: "Data Completeness", description: "The Address column has the highest missing value rate at 2.3%.", type: "neutral" }
  ],
  preview: [
    { id: 1, department: "Engineering", salary: 120000, age: 34, experience: 10, gender: "Female" },
    { id: 2, department: "Sales", salary: 85000, age: 28, experience: 4, gender: "Male" },
    { id: 3, department: "HR", salary: 75000, age: 41, experience: 15, gender: "Female" },
    { id: 4, department: "Marketing", salary: 92000, age: 31, experience: 7, gender: "Male" },
    { id: 5, department: "Engineering", salary: 145000, age: 45, experience: 20, gender: "Male" }
  ],
  charts: {
    category_bars: {
      department: [
        { category: "Engineering", count: 450 }, { category: "Sales", count: 320 },
        { category: "Marketing", count: 150 }, { category: "HR", count: 80 }
      ]
    },
    scatter_plots: {
      salary_vs_experience: [
        { x: 2, y: 55000 }, { x: 5, y: 75000 }, { x: 10, y: 120000 },
        { x: 15, y: 140000 }, { x: 20, y: 180000 }
      ]
    },
    feature_importance_chart: [
      { feature: "Experience", importance: 0.45 }, { feature: "Department", importance: 0.25 },
      { feature: "Age", importance: 0.15 }, { feature: "Performance", importance: 0.15 }
    ],
    trend_chart: [
      { period: "Q1", hires: 120, attrition: 30 }, { period: "Q2", hires: 150, attrition: 45 },
      { period: "Q3", hires: 90, attrition: 25 }, { period: "Q4", hires: 200, attrition: 40 }
    ]
  }
};

export default function DatasetDashboard() {
  const [data] = useState(mockData);

  // Helper to render correlation matrix as a grid
  const renderCorrelationMatrix = () => {
    const keys = Object.keys(data.correlations.matrix);
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr>
              <th className="p-2 border-b border-black/10"></th>
              {keys.map(k => <th key={k} className="p-2 border-b border-black/10 font-bold">{k}</th>)}
            </tr>
          </thead>
          <tbody>
            {keys.map(rowKey => (
              <tr key={rowKey}>
                <td className="p-2 border-b border-black/10 font-bold">{rowKey}</td>
                {keys.map(colKey => {
                  const val = data.correlations.matrix[rowKey][colKey];
                  // Calculate opacity based on absolute correlation value for grayscale mapping
                  const opacity = Math.abs(val); 
                  return (
                    <td key={colKey} className="p-2 border-b border-black/10 text-center">
                      <div 
                        className="inline-block px-3 py-1 rounded text-white" 
                        style={{ backgroundColor: `rgba(0,0,0,${opacity})`, color: opacity > 0.5 ? '#fff' : '#000' }}
                      >
                        {val.toFixed(2)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans selection:bg-black selection:text-white">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
        className="mb-8 border-b border-black/10 pb-6"
      >
        <h1 className="text-4xl font-black tracking-tight text-black flex items-center gap-3">
          <Database className="w-8 h-8" />
          Dataset Profile Report
        </h1>
        <p className="text-gray-500 mt-2">Comprehensive data profiling, statistics, and machine learning readiness summary.</p>
      </motion.div>

      {/* KPI Overview Cards */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10"
      >
        <KpiCard title="Total Rows" value={data.overview.rows.toLocaleString()} icon={<Rows />} />
        <KpiCard title="Total Columns" value={data.overview.columns} icon={<Columns />} />
        <KpiCard title="Missing Values" value={data.overview.missing_values} icon={<AlertCircle />} />
        <KpiCard title="Duplicates" value={data.overview.duplicate_rows} icon={<GitCommit />} />
        <KpiCard title="Data Quality" value={`${data.overview.data_quality_score}%`} icon={<Activity />} />
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="bg-gray-100 p-1 rounded-md mb-6 flex flex-wrap gap-1">
            <TabsTrigger value="insights" className="data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300">Overview & Insights</TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300">Statistics & ML Data</TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300">Data Quality</TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-300">Raw Data</TabsTrigger>
          </TabsList>

          {/* ================= INSIGHTS TAB ================= */}
          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 border-b border-black/10 pb-2"><AlertCircle className="w-5 h-5"/> Key Findings</h3>
                {data.insights.map((insight, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Card className="border-black/20 shadow-none hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          {insight.type === 'warning' ? <AlertCircle className="w-4 h-4 text-gray-600" /> : <CheckCircle2 className="w-4 h-4 text-black" />}
                          {insight.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-2 space-y-6">
                 {/* Trends Line Chart */}
                <Card className="border-black/20 shadow-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Hiring vs Attrition Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.charts.trend_chart}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="period" stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000', borderRadius: '4px', border: '1px solid #000' }} />
                        <Line type="monotone" dataKey="hires" stroke="#000" strokeWidth={3} dot={{ fill: '#000', r: 4 }} animationDuration={2000} />
                        <Line type="monotone" dataKey="attrition" stroke="#9ca3af" strokeWidth={3} strokeDasharray="5 5" dot={{ fill: '#9ca3af', r: 4 }} animationDuration={2000} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ================= STATISTICS TAB ================= */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              
              {/* Feature Importance */}
              <Card className="border-black/20 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BarChart2 className="w-5 h-5"/> Feature Importance</CardTitle>
                  <CardDescription>Target variable correlation weight</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data.charts.feature_importance_chart} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={true} vertical={false}/>
                      <XAxis type="number" stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis type="category" dataKey="feature" stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#000', color: '#fff', borderRadius: '4px', border: 'none' }} cursor={{fill: '#f3f4f6'}} />
                      <Bar dataKey="importance" fill="#000" radius={[0, 4, 4, 0]} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Scatter Plot */}
              <Card className="border-black/20 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Layers className="w-5 h-5"/> Salary vs Experience</CardTitle>
                  <CardDescription>Correlation distribution</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis type="number" dataKey="x" name="Experience (Yrs)" stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis type="number" dataKey="y" name="Salary" stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#fff', color: '#000', border: '1px solid #000' }} />
                      <Scatter name="Employees" data={data.charts.scatter_plots.salary_vs_experience} fill="#000" animationDuration={1500} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Correlation Matrix & Numerical Analysis */}
              <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-black/20 shadow-none">
                  <CardHeader>
                    <CardTitle>Correlation Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderCorrelationMatrix()}
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm mb-2">Strongest Relationships:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {data.correlations.strong_relationships.map((rel, i) => (
                          <li key={i} className="flex justify-between border-b border-black/5 pb-1">
                            <span>{rel.feature_1} & {rel.feature_2}</span>
                            <span className="font-bold text-black">{rel.correlation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-black/20 shadow-none">
                  <CardHeader>
                    <CardTitle>Numerical Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-black/20">
                          <TableHead className="font-bold text-black">Feature</TableHead>
                          <TableHead className="font-bold text-black">Mean</TableHead>
                          <TableHead className="font-bold text-black">Std Dev</TableHead>
                          <TableHead className="font-bold text-black">Outliers</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(data.numerical_analysis).map(([feature, stats]) => (
                          <TableRow key={feature} className="border-black/10">
                            <TableCell className="font-bold">{feature}</TableCell>
                            <TableCell>{stats.mean}</TableCell>
                            <TableCell>{stats.std}</TableCell>
                            <TableCell>
                              {data.outliers[feature] > 0 ? (
                                <Badge className="bg-black text-white hover:bg-gray-800">{data.outliers[feature]}</Badge>
                              ) : (
                                "0"
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

            </div>
          </TabsContent>

          {/* ================= DATA QUALITY TAB ================= */}
          <TabsContent value="quality">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-black/20 shadow-none">
                <CardHeader>
                  <CardTitle>Missing Values Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-black/20">
                        <TableHead className="text-black font-bold">Column Name</TableHead>
                        <TableHead className="text-black font-bold">Missing Count</TableHead>
                        <TableHead className="text-black font-bold">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.data_quality.map((item, index) => (
                        <TableRow key={index} className="border-black/10">
                          <TableCell className="font-medium">{item.column}</TableCell>
                          <TableCell>{item.missing}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="w-10">{item.percent}%</span>
                              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }} animate={{ width: `${item.percent}%` }}
                                  transition={{ duration: 1, ease: "easeOut" }}
                                  className="h-full bg-black"
                                />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-black/20 shadow-none">
                <CardHeader>
                  <CardTitle>Basic Profile & Data Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-black/20">
                        <TableHead className="text-black font-bold">Column</TableHead>
                        <TableHead className="text-black font-bold">Type</TableHead>
                        <TableHead className="text-black font-bold">Unique Vals</TableHead>
                        <TableHead className="text-black font-bold">Shape / Dist</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.basic_summary.map((item, index) => (
                        <TableRow key={index} className="border-black/10">
                          <TableCell className="font-bold">{item.column}</TableCell>
                          <TableCell>
                            <span className="text-xs border border-black px-2 py-1 rounded bg-gray-50">{item.type}</span>
                          </TableCell>
                          <TableCell>{item.unique}</TableCell>
                          <TableCell className="text-gray-500 text-sm">
                             {data.distribution[item.column] ? data.distribution[item.column].shape : "N/A"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ================= DATA PREVIEW TAB ================= */}
          <TabsContent value="preview">
             <Card className="border-black/20 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Head (Top Rows Preview)
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-black/20 bg-gray-100">
                      {Object.keys(data.preview[0]).map((key) => (
                        <TableHead key={key} className="text-black font-bold capitalize whitespace-nowrap">{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.preview.map((row, idx) => (
                      <TableRow key={idx} className="border-black/10 hover:bg-gray-50 transition-colors">
                        {Object.values(row).map((val, i) => (
                          <TableCell key={i} className="whitespace-nowrap">{val}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </motion.div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function KpiCard({ title, value, icon }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-black/20 shadow-none hover:border-black transition-all duration-300 group cursor-default h-full bg-gray-50/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-black transition-colors">
            {title}
          </CardTitle>
          <div className="text-gray-400 group-hover:text-black transition-colors">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-black text-black">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}