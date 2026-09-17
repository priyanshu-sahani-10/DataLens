"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  AlertCircle,
  Loader2,
  Database,
  Columns3,
  AlertTriangle,
  Copy,
  LayoutDashboard,
  BarChart3,
  Network,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { analyzeCSV } from "@/lib/analyze";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import Footer from "@/components/footer";

// Utility for formatting numbers
const formatNum = (num) =>
  typeof num === "number"
    ? Number.isInteger(num)
      ? num
      : num.toFixed(2)
    : num;

export default function DatasetDashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const {
    overview = {},
    data_quality = [],
    basic_summary = [],
    numerical_analysis = {},
    categorical_analysis = {},
    outliers = {},
    distribution = {},
    correlations = { strong_relationships: [] },
    feature_importance = [],
    preview = [],
    charts = {
      histograms: {},
      category_bars: {},
      scatter_plots: {},
      outlier_boxplots: {},
      heatmap: [],
    },
  } = data || {};
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // 1. Check if the extension ends with .csv
    const hasCsvExtension = selectedFile.name.toLowerCase().endsWith(".csv");

    // 2. Check for common CSV MIME types across different OS environments
    const validMimeTypes = [
      "text/csv",
      "application/csv",
      "application/vnd.ms-excel",
      "text/x-csv",
    ];
    const hasCsvMimeType = validMimeTypes.includes(selectedFile.type);

    // If either the extension matches or the MIME type matches, accept it
    if (hasCsvExtension || hasCsvMimeType) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid CSV file.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const result = await analyzeCSV(file);

      setData(result);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to analyze dataset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans selection:bg-cyan-200">
      <Navbar />
      <Hero />

      <div className="w-full max-w-md mx-auto dark pb-10">
        <Card className="border-slate-200 bg-white text-slate-900 shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-6 space-y-6">
            {/* Drag & Drop / Click Upload Area */}
            <label
              htmlFor="csv-upload"
              className="group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 hover:border-slate-300 bg-slate-100/50 hover:bg-slate-100 rounded-xl cursor-pointer transition-all duration-200 ease-in-out"
            >
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <div className="p-3 bg-cyan-100 rounded-lg text-slate-500 group-hover:text-slate-700 group-hover:scale-105 transition-all duration-200 mb-3">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="mb-1 text-sm font-medium text-slate-700">
                  <span className="text-cyan-700 font-semibold group-hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-slate-500">
                  Only CSV files are supported
                </p>
              </div>
            </label>

            {/* Selected File Preview */}
            {file && (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-100 border border-slate-200 animate-in fade-in-50 slide-in-from-bottom-1">
                <div className="p-2 bg-slate-200 rounded text-slate-500">
                  <FileText className="h-5 w-5 text-cyan-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-50 border-red-200 text-red-700"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Action Button */}
            <Button
              onClick={handleUpload}
              disabled={loading || !file}
              className="w-full h-11 bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none transition-colors font-semibold rounded-lg shadow-[0_4px_20px_rgba(8,145,178,0.3)]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Dataset...
                </>
              ) : (
                "Analyze Dataset"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      {data && (
        <div className="max-w-7xl mx-auto space-y-8 ">
          {/* HEADER & OVERVIEW */}
          <div className="space-y-8 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-cyan-700 to-cyan-500 bg-clip-text text-transparent">
                    Dataset Analytics
                  </h1>

                  <p className="mt-3 text-slate-500 text-lg">
                    Automated insights, quality checks, statistics and visual
                    exploration
                  </p>
                </div>

                <div className="hidden lg:flex items-center gap-3">
                  <Badge className="bg-cyan-50 text-cyan-700 border border-cyan-200">
                    Ready
                  </Badge>
                </div>
              </div>
            </div>

            {/* Grid Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Rows */}
              <Card className="group relative overflow-hidden border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/60 to-white backdrop-blur-xl rounded-3xl transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center">
                      <Database className="h-6 w-6 text-cyan-700" />
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                      Dataset
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm font-medium">
                    Total Rows
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">
                    {(overview.rows ?? 0).toLocaleString()}
                  </h2>

                  <div className="mt-4 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
                </CardContent>
              </Card>

              {/* Columns */}
              <Card className="group relative overflow-hidden border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/60 to-white backdrop-blur-xl rounded-3xl transition-all duration-500 hover:border-sky-400/40 hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center">
                      <Columns3 className="h-6 w-6 text-sky-700" />
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      Features
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm font-medium">
                    Total Columns
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">
                    {(overview.columns ?? 0).toLocaleString()}
                  </h2>

                  <div className="mt-4 h-px bg-gradient-to-r from-sky-400/40 to-transparent" />
                </CardContent>
              </Card>

              {/* Missing Values */}
              <Card className="group relative overflow-hidden border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/60 to-white backdrop-blur-xl rounded-3xl transition-all duration-500 hover:border-teal-300/40 hover:shadow-[0_0_40px_rgba(45,212,191,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-teal-700" />
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      Quality
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm font-medium">
                    Missing Values
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">
                    {(overview.missing_values ?? 0).toLocaleString()}
                  </h2>

                  <div className="mt-4 h-px bg-gradient-to-r from-teal-300/40 to-transparent" />
                </CardContent>
              </Card>

              {/* Duplicates */}
              <Card className="group relative overflow-hidden border border-slate-200/80 bg-gradient-to-br from-white via-cyan-50/60 to-white backdrop-blur-xl rounded-3xl transition-all duration-500 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(96,165,250,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                      <Copy className="h-6 w-6 text-blue-700" />
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Cleanup
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm font-medium">
                    Duplicate Rows
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">
                    {(overview.duplicate_rows ?? 0).toLocaleString()}
                  </h2>

                  <div className="mt-4 h-px bg-gradient-to-r from-blue-400/40 to-transparent" />
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full mb-70 xs:mb-50 sm:mb-40 lg:mb-20 h-auto bg-white border border-slate-200 shadow-sm backdrop-blur-2xl  p-2 flex flex-wrap gap-2">
              <TabsTrigger
                value="preview"
                className="
      flex items-center gap-2
      rounded-xl px-7 py-7
      text-slate-500
      hover:text-cyan-700 hover:bg-cyan-50
      data-[state=active]:bg-cyan-600
      data-[state=active]:text-white
      data-[state=active]:shadow-lg
      transition-all duration-300
    "
              >
                <Database size={16} />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="
      flex items-center gap-2
      rounded-xl px-7 py-7
      text-slate-500
      hover:text-cyan-700 hover:bg-cyan-50
      data-[state=active]:bg-cyan-600
      data-[state=active]:text-white
      data-[state=active]:shadow-lg
      transition-all duration-300
    "
              >
                <LayoutDashboard size={16} />
                Summary
              </TabsTrigger>

              <TabsTrigger
                value="stats"
                className="
      flex items-center gap-2
      rounded-xl px-7 py-7
      text-slate-500
      hover:text-cyan-700 hover:bg-cyan-50
      data-[state=active]:bg-cyan-600
      data-[state=active]:text-white
      data-[state=active]:shadow-lg
      transition-all duration-300
    "
              >
                <BarChart3 size={16} />
                Statistics
              </TabsTrigger>

              <TabsTrigger
                value="relationships"
                className="
      flex items-center gap-2
      rounded-xl px-7 py-7
      text-slate-500
      hover:text-cyan-700 hover:bg-cyan-50
      data-[state=active]:bg-cyan-600
      data-[state=active]:text-white
      data-[state=active]:shadow-lg
      transition-all duration-300
    "
              >
                <Network size={16} />
                Relationships
              </TabsTrigger>

              <TabsTrigger
                value="charts"
                className="
      flex items-center gap-2
      rounded-xl px-7 py-7
      text-slate-500
      hover:text-cyan-700 hover:bg-cyan-50
      data-[state=active]:bg-cyan-600
      data-[state=active]:text-white
      data-[state=active]:shadow-lg
      transition-all duration-300
    "
              >
                <LineChart size={16} />
                Visualizations
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: SUMMARY & QUALITY */}
            <TabsContent value="summary" className="mt-6 space-y-4 focus-visible:outline-none focus-visible:ring-0">
 
      {/* ── BASIC SUMMARY ── */}
      <Card       className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
        <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-100/80 via-white to-slate-100/80 px-5 py-5 sm:px-6 md:px-8">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Basic Summary
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 sm:text-sm">
              Types, nulls, and unique counts per column
            </CardDescription>
          </div>
        </CardHeader>
 
        <CardContent className="p-0">
          <div className="relative w-full overflow-hidden">
            {/* Right-edge fade on mobile */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-r from-transparent to-white/80 sm:hidden"
              aria-hidden="true"
            />
 
            <ScrollArea className="h-[min(60vh,420px)] w-full">
              <Table className="min-w-[500px]">
                <TableHeader className="sticky top-0 z-20">
                  <TableRow className=" border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl hover:bg-white/95">
                    <TableHead className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]">
                      Column
                    </TableHead>
                    <TableHead className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]">
                      Type
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]">
                      Nulls
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]">
                      Unique
                    </TableHead>
                  </TableRow>
                </TableHeader>
 
                <TableBody>
                  {basic_summary.map((item) => (
                    <TableRow
                      key={item.column}
                      className="group border-b border-slate-100 transition-colors hover:bg-cyan-50"
                    >
                      <TableCell className="px-4 py-2.5 text-xs font-medium text-slate-600 transition-colors group-hover:text-slate-900 md:px-6 md:py-4 md:text-sm">
                        {item.column}
                      </TableCell>
                      <TableCell className="px-4 py-2.5 md:px-6 md:py-4">
                        <Badge
                          variant="outline"
                          className="border-slate-300 bg-slate-100 text-[10px] text-slate-600 md:text-xs"
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-slate-500 transition-colors group-hover:text-slate-700 md:px-6 md:py-4 md:text-sm">
                        {item.nulls.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-slate-500 transition-colors group-hover:text-slate-700 md:px-6 md:py-4 md:text-sm">
                        {item.unique.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
 
            {/* Mobile scroll hint */}
            <div className="flex items-center gap-1.5 border-t border-slate-100 px-4 py-2 sm:hidden">
              <svg className="h-3 w-3 text-slate-9000 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span className="text-[11px] text-slate-9000">Scroll horizontally to see all columns</span>
            </div>
          </div>
        </CardContent>
      </Card>
 
      {/* ── DATA QUALITY ── */}
      <Card       className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
        <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-100/80 via-white to-slate-100/80 px-5 py-5 sm:px-6 md:px-8">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Data Quality
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 sm:text-sm">
              Missing values by column
            </CardDescription>
          </div>
        </CardHeader>
 
        <CardContent className="p-0">
          <div className="relative w-full overflow-hidden">
            {/* Right-edge fade on mobile */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-r from-transparent to-white/80 sm:hidden"
              aria-hidden="true"
            />
 
            <ScrollArea className="h-[min(60vh,420px)] w-full">
              <Table className="min-w-[400px]">
                <TableHeader className="sticky top-0 z-20">
                  <TableRow className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl hover:bg-white/95">
                    <TableHead className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]">
                      Column
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]">
                      Missing
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]">
                      %
                    </TableHead>
                    <TableHead className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]">
                      Health
                    </TableHead>
                  </TableRow>
                </TableHeader>
 
                <TableBody>
                  {data_quality.map((item) => (
                    <TableRow
                      key={item.column}
                      className="group border-b border-slate-100 transition-colors hover:bg-cyan-50"
                    >
                      <TableCell className="px-4 py-2.5 text-xs font-medium text-slate-600 transition-colors group-hover:text-slate-900 md:px-6 md:py-4 md:text-sm">
                        {item.column}
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-slate-500 transition-colors group-hover:text-slate-700 md:px-6 md:py-4 md:text-sm">
                        {item.missing.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-slate-500 transition-colors group-hover:text-slate-700 md:px-6 md:py-4 md:text-sm">
                        {Number.isInteger(item.percent)
                          ? item.percent.toLocaleString()
                          : item.percent.toFixed(2)}
                        %
                      </TableCell>
                      <TableCell className="px-4 py-2.5 md:px-6 md:py-4">
                        <div className="flex items-center gap-2">
                          {/* Progress bar */}
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200 sm:w-24">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${Math.min(item.percent, 100)}%`,
                                backgroundColor:
                                  item.percent === 0
                                    ? "#22c55e"
                                    : item.percent < 5
                                    ? "#84cc16"
                                    : item.percent < 20
                                    ? "#f59e0b"
                                    : "#ef4444",
                              }}
                            />
                          </div>
                          {/* Badge */}
                          <Badge
                            variant="outline"
                            className={`hidden text-[10px] sm:inline-flex md:text-xs ${
                              item.percent === 0
                                ? "border-green-200 bg-green-50 text-green-700"
                                : item.percent < 5
                                ? "border-lime-200 bg-lime-50 text-lime-700"
                                : item.percent < 20
                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                : "border-red-200 bg-red-50 text-red-700"
                            }`}
                          >
                            {item.percent === 0
                              ? "Clean"
                              : item.percent < 5
                              ? "Good"
                              : item.percent < 20
                              ? "Fair"
                              : "Poor"}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
 
            {/* Mobile scroll hint */}
            <div className="flex items-center gap-1.5 border-t border-slate-100 px-4 py-2 sm:hidden">
              <svg className="h-3 w-3 text-slate-9000 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span className="text-[11px] text-slate-9000">Scroll horizontally to see all columns</span>
            </div>
          </div>
        </CardContent>
      </Card>
 
    </TabsContent>

            {/* TAB 2: STATISTICS & DISTRIBUTIONS */}
            <TabsContent value="stats" className="space-y-4 mt-4">
              <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
                <CardHeader>
                  <CardTitle>Numerical Analysis & Distributions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <Table>
                      <TableHeader className="border-slate-200">
                        <TableRow className="border-slate-200 hover:bg-slate-100/50">
                          <TableHead className="text-slate-500">
                            Column
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Min
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Max
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Mean
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Median
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Std Dev
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Outliers
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Skewness
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Shape
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(numerical_analysis).map(
                          ([col, stats]) => (
                            <TableRow
                              key={col}
                              className="border-slate-200 hover:bg-slate-100"
                            >
                              <TableCell className="font-medium">
                                {col}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNum(stats.min)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNum(stats.max)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNum(stats.mean)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNum(stats.median)}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNum(stats.std)}
                              </TableCell>
                              <TableCell className="text-right">
                                {outliers[col] || 0}
                              </TableCell>
                              <TableCell className="text-right">
                                {formatNum(distribution[col]?.skewness)}
                              </TableCell>
                              <TableCell className="text-right">
                                {distribution[col]?.shape || "N/A"}
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
                <CardHeader>
                  <CardTitle>Categorical Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(categorical_analysis).map(
                      ([col, stats]) => (
                        <div
                          key={col}
                          className="p-4 border border-slate-200 rounded-md bg-slate-50"
                        >
                          <h4 className="font-semibold mb-2">{col}</h4>
                          <div className="text-sm text-slate-500 flex justify-between mb-2">
                            <span>
                              Top Category:{" "}
                              <strong className="text-slate-900">
                                {stats.top_category || "N/A"}
                              </strong>
                            </span>
                            <span>{formatNum(stats.top_freq_percent)}%</span>
                          </div>
                          <div className="text-xs text-slate-500 space-y-1">
                            {Object.entries(stats.value_counts)
                              .slice(0, 5)
                              .map(([val, count]) => (
                                <div key={val} className="flex justify-between">
                                  <span>{val}</span>
                                  <span>{count.toLocaleString()}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: CORRELATIONS & FEATURE IMPORTANCE */}
            <TabsContent value="relationships" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
                  <CardHeader>
                    <CardTitle>Strong Correlations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader className="border-slate-200">
                        <TableRow className="border-slate-200 hover:bg-slate-100/50">
                          <TableHead className="text-slate-500">
                            Feature 1
                          </TableHead>
                          <TableHead className="text-slate-500">
                            Feature 2
                          </TableHead>
                          <TableHead className="text-slate-500 text-right">
                            Score
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {correlations.strong_relationships.map((rel, idx) => (
                          <TableRow
                            key={idx}
                            className="border-slate-200 hover:bg-slate-100"
                          >
                            <TableCell>{rel.feature_1}</TableCell>
                            <TableCell>{rel.feature_2}</TableCell>
                            <TableCell className="text-right font-mono">
                              {formatNum(rel.correlation)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
                  <CardHeader>
                    <CardTitle>Feature Importance</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={feature_importance}
                        layout="vertical"
                        margin={{ left: 40 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#E2E8F0"
                          horizontal={false}
                        />
                        <XAxis type="number" stroke="#64748B" />
                        <YAxis
                          dataKey="feature"
                          type="category"
                          stroke="#64748B"
                          fontSize={12}
                        />
                        <Tooltip
                          cursor={{ fill: "#F1F5F9" }}
                          contentStyle={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#CBD5E1",
                          }}
                        />
                        <Bar
                          dataKey="importance"
                          fill="#0891b2"
                          radius={[0, 4, 4, 0]}
                        />
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
                  <ChartCard
                    key={col}
                    title={`${col} Distribution (Histogram)`}
                  >
                    <BarChart data={data}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E2E8F0"
                        vertical={false}
                      />
                      <XAxis dataKey="range" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} />
                      <Tooltip
                        cursor={{ fill: "#F1F5F9" }}
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#CBD5E1",
                        }}
                      />
                      <Bar dataKey="count" fill="#0891b2" />
                    </BarChart>
                  </ChartCard>
                ))}
              </div>

              {/* Category Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(charts.category_bars || {}).map(
                  ([col, data]) => (
                    <ChartCard key={col} title={`${col} Frequencies`}>
                      <BarChart data={data}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#E2E8F0"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="category"
                          stroke="#64748B"
                          fontSize={12}
                        />
                        <YAxis stroke="#64748B" fontSize={12} />
                        <Tooltip
                          cursor={{ fill: "#F1F5F9" }}
                          contentStyle={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#CBD5E1",
                          }}
                        />
                        <Bar dataKey="count" fill="#38bdf8" />
                      </BarChart>
                    </ChartCard>
                  ),
                )}
              </div>

              {/* Scatter Plots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(charts.scatter_plots || {}).map(
                  ([name, data]) => (
                    <ChartCard key={name} title={name}>
                      <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid stroke="#E2E8F0" />
                        <XAxis
                          dataKey="x"
                          type="number"
                          name="X"
                          stroke="#64748B"
                        />
                        <YAxis
                          dataKey="y"
                          type="number"
                          name="Y"
                          stroke="#64748B"
                        />
                        <Tooltip
                          cursor={{ strokeDasharray: "3 3" }}
                          contentStyle={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#CBD5E1",
                          }}
                        />
                        <Scatter name={name} data={data} fill="#0891b2" />
                      </ScatterChart>
                    </ChartCard>
                  ),
                )}
              </div>

              {/* Custom BoxPlots (CSS Based since Recharts lacks native boxplot) */}
              <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
                <CardHeader>
                  <CardTitle>Outlier BoxPlots</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(charts.outlier_boxplots || {}).map(
                    ([col, box]) => {
                      const span = box.max - box.min || 1;
                      const boxWidth = Math.max(
                        ((box.q3 - box.q1) / span) * 100,
                        box.q3 > box.q1 ? 2 : 0
                      );
                      const boxLeft = ((box.q1 - box.min) / span) * 100;
                      const medianLeft =
                        box.q3 > box.q1
                          ? ((box.median - box.q1) / (box.q3 - box.q1)) * 100
                          : 50;
                      return (
                        <div
                          key={col}
                          className="p-4 border border-slate-200 rounded-lg flex flex-col items-center"
                        >
                          <h4 className="mb-4 text-sm font-semibold">{col}</h4>
                          <div className="relative w-full h-8 flex items-center px-4">
                            {/* Whisker Line */}
                            <div className="absolute left-4 right-4 h-px bg-slate-300 top-1/2" />
                            {/* Box (Q1 to Q3) */}
                            <div
                              className="absolute h-full bg-cyan-600/15 border-2 border-cyan-600 top-0"
                              style={{
                                left: `${boxLeft}%`,
                                width: `${boxWidth}%`,
                              }}
                            >
                              {/* Median Line */}
                              <div
                                className="absolute w-1 bg-cyan-700 h-full top-0"
                                style={{
                                  left: `${medianLeft}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-full flex justify-between text-xs text-slate-500 mt-2">
                            <span>{formatNum(box.min)} (Min)</span>
                            <span>{formatNum(box.max)} (Max)</span>
                          </div>
                        </div>
                      );
                    }
                  )}
                </CardContent>
              </Card>

              {/* Heatmap (CSS Grid Approximation) */}
              <Card className="bg-white border-slate-200 text-slate-900 shadow-sm">
                <CardHeader>
                  <CardTitle>Correlation Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {charts.heatmap?.map((item, idx) => {
                      // Map value (0 to 1) to opacity of white (adjusted for dark theme contrast)
                      const intensity = Math.abs(item.value);
                      return (
                        <div
                          key={idx}
                          className="w-24 h-24 border border-slate-200 flex flex-col items-center justify-center text-xs p-1 text-center transition-colors"
                          style={{
                            backgroundColor: `rgba(8, 145, 178, ${0.08 + intensity * 0.75})`,
                          }}
                        >
                          <span className="text-slate-700 font-bold">
                            {item.x} x {item.y}
                          </span>
                          <span className="text-slate-700">
                            {formatNum(item.value)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 5: PREVIEW ROW */}
            <TabsContent
      value="preview"
      className="mt-6 focus-visible:outline-none focus-visible:ring-0"
    >
      <Card       className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
 
        {/* ── HEADER ── */}
        <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-100/80 via-white to-slate-100/80 px-5 py-5 sm:px-6 md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
 
            {/* Title & Description */}
            <div className="min-w-0 space-y-1">
              <CardTitle className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
                Dataset Preview
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 sm:text-sm">
                Explore the first rows of your uploaded dataset
              </CardDescription>
            </div>
 
            {/* Stats Grid */}
            <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:min-w-[220px] lg:flex-shrink-0">
              <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 transition-colors hover:bg-slate-200">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
                  Rows
                </span>
                <span className="mt-0.5 text-lg font-semibold tabular-nums text-slate-900 sm:text-xl">
                  {data.preview?.length ?? 0}
                </span>
              </div>
 
              <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 transition-colors hover:bg-slate-200">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
                  Columns
                </span>
                <span className="mt-0.5 text-lg font-semibold tabular-nums text-slate-900 sm:text-xl">
                  {Object.keys(data.preview?.[0] ?? {}).length}
                </span>
              </div>
            </div>
 
          </div>
        </CardHeader>
 
        {/* ── CONTENT ── */}
        <CardContent className="p-0">
          {!preview || preview.length === 0 ? (
 
            /* Empty State */
            <div className="flex h-[300px] flex-col items-center justify-center gap-3 text-slate-500 sm:h-[400px]">
              <svg
                className="h-9 w-9 opacity-40 sm:h-10 sm:w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
              <p className="text-xs text-slate-500 sm:text-sm">
                No dataset information available to preview.
              </p>
            </div>
 
          ) : (
 
            /* Data Table */
            <div className="relative w-full overflow-hidden">
              {/* Right-edge fade hint on small screens */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-r from-transparent to-white/80 sm:hidden"
                aria-hidden="true"
              />
 
              <ScrollArea className="h-[min(65vh,500px)] w-full md:h-[min(65vh,650px)]">
                {/* min-w forces horizontal scroll rather than squishing */}
                <Table className="min-w-[640px]">
 
                  <TableHeader className="sticky top-0 z-20">
                    <TableRow className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl hover:bg-white/95">
                      {Object.keys(preview[0]).map((key) => (
                        <TableHead
                          key={key}
                          className="whitespace-nowrap px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500 md:px-6 md:py-4 md:text-[11px]"
                        >
                          {key.replaceAll("_", " ")}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
 
                  <TableBody>
                    {preview.map((row, index) => (
                      <TableRow
                        key={index}
                        className="group border-b border-slate-100 transition-colors hover:bg-cyan-50"
                      >
                        {Object.values(row).map((val, cellIndex) => (
                          <TableCell
                            key={cellIndex}
                            className="max-w-[160px] truncate whitespace-nowrap px-4 py-2.5 text-xs text-slate-500 transition-colors group-hover:text-slate-700 md:max-w-[200px] md:px-6 md:py-4 md:text-sm"
                          >
                            {typeof val === "number" ? (
                              <span className="font-mono text-slate-600 group-hover:text-slate-900">
                                {formatNum(val)}
                              </span>
                            ) : (
                              <span title={String(val ?? "")}>
                                {String(val ?? "")}
                              </span>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
 
                </Table>
 
                {/* Horizontal scrollbar always visible */}
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
 
              {/* Mobile scroll hint */}
              <div className="flex items-center gap-1.5 border-t border-slate-100 px-4 py-2 sm:hidden">
                <ArrowRight className="h-3 w-3 text-slate-9000 opacity-60" />
                <span className="text-[11px] text-slate-9000">
                  Scroll horizontally to see all columns
                </span>
              </div>
            </div>
 
          )}
        </CardContent>
 
      </Card>
    </TabsContent>
          </Tabs>
        </div>
      )}
      <Footer />
    </div>
  );
}

// Sub-components
function OverviewCard({ title, value }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900">
          {typeof value === "number" ? value.toLocaleString() : (value ?? "—")}
        </div>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, children }) {
  return (
    <Card className="bg-white border-slate-200 text-slate-900 shadow-sm h-[350px] flex flex-col">
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
