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
    <div className="min-h-screen bg-black text-zinc-100 p-8 font-sans selection:bg-zinc-800">
      <Navbar />
      <Hero />

      <div className="w-full max-w-md mx-auto dark pb-10">
        <Card className="border-zinc-800 bg-zinc-950 text-zinc-50 shadow-xl rounded-xl overflow-hidden">
          <CardContent className="p-6 space-y-6">
            {/* Drag & Drop / Click Upload Area */}
            <label
              htmlFor="csv-upload"
              className="group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900 rounded-xl cursor-pointer transition-all duration-200 ease-in-out"
            >
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <div className="p-3 bg-zinc-800/80 rounded-lg text-zinc-400 group-hover:text-zinc-200 group-hover:scale-105 transition-all duration-200 mb-3">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="mb-1 text-sm font-medium text-zinc-200">
                  <span className="text-blue-400 font-semibold group-hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-zinc-500">
                  Only CSV files are supported
                </p>
              </div>
            </label>

            {/* Selected File Preview */}
            {file && (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800 animate-in fade-in-50 slide-in-from-bottom-1">
                <div className="p-2 bg-zinc-800 rounded text-zinc-400">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-950/50 border-red-900/50 text-red-200"
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
              className="w-full h-11 bg-zinc-50 text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 disabled:pointer-events-none transition-colors font-medium rounded-lg shadow"
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
          <div className="space-y-8 p-8 bg-black border border-zinc-900 rounded-2xl shadow-2xl">
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                    Dataset Analytics
                  </h1>

                  <p className="mt-3 text-zinc-400 text-lg">
                    Automated insights, quality checks, statistics and visual
                    exploration
                  </p>
                </div>

                <div className="hidden lg:flex items-center gap-3">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Ready
                  </Badge>
                </div>
              </div>
            </div>

            {/* Grid Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Rows */}
              <Card className="group relative overflow-hidden border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 backdrop-blur-xl rounded-3xl transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Database className="h-6 w-6 text-blue-400" />
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Dataset
                    </span>
                  </div>

                  <p className="text-zinc-500 text-sm font-medium">
                    Total Rows
                  </p>

                  <h2 className="text-4xl font-bold text-white mt-2 tracking-tight">
                    {(overview.rows ?? 0).toLocaleString()}
                  </h2>

                  <div className="mt-4 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
                </CardContent>
              </Card>

              {/* Columns */}
              <Card className="group relative overflow-hidden border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 backdrop-blur-xl rounded-3xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Columns3 className="h-6 w-6 text-purple-400" />
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Features
                    </span>
                  </div>

                  <p className="text-zinc-500 text-sm font-medium">
                    Total Columns
                  </p>

                  <h2 className="text-4xl font-bold text-white mt-2 tracking-tight">
                    {(overview.columns ?? 0).toLocaleString()}
                  </h2>

                  <div className="mt-4 h-px bg-gradient-to-r from-purple-500/40 to-transparent" />
                </CardContent>
              </Card>

              {/* Missing Values */}
              <Card className="group relative overflow-hidden border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 backdrop-blur-xl rounded-3xl transition-all duration-500 hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-amber-400" />
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Quality
                    </span>
                  </div>

                  <p className="text-zinc-500 text-sm font-medium">
                    Missing Values
                  </p>

                  <h2 className="text-4xl font-bold text-white mt-2 tracking-tight">
                    {(overview.missing_values ?? 0).toLocaleString()}
                  </h2>

                  <div className="mt-4 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
                </CardContent>
              </Card>

              {/* Duplicates */}
              <Card className="group relative overflow-hidden border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 backdrop-blur-xl rounded-3xl transition-all duration-500 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Copy className="h-6 w-6 text-emerald-400" />
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Cleanup
                    </span>
                  </div>

                  <p className="text-zinc-500 text-sm font-medium">
                    Duplicate Rows
                  </p>

                  <h2 className="text-4xl font-bold text-white mt-2 tracking-tight">
                    {(overview.duplicate_rows ?? 0).toLocaleString()}
                  </h2>

                  <div className="mt-4 h-px bg-gradient-to-r from-emerald-500/40 to-transparent" />
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="w-full mb-70 xs:mb-50 sm:mb-40 lg:mb-20 h-auto bg-zinc-950/70 backdrop-blur-2xl  p-2 flex flex-wrap gap-2 shadow-[0_0_40px_rgba(255,255,255,0.03)]">
              <TabsTrigger
                value="preview"
                className="
      flex items-center gap-2
      rounded-xl px-7 py-7
      text-zinc-400
      hover:text-white hover:bg-white/5
      data-[state=active]:bg-white
      data-[state=active]:text-black
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
      text-zinc-400
      hover:text-white hover:bg-white/5
      data-[state=active]:bg-white
      data-[state=active]:text-black
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
      text-zinc-400
      hover:text-white hover:bg-white/5
      data-[state=active]:bg-white
      data-[state=active]:text-black
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
      text-zinc-400
      hover:text-white hover:bg-white/5
      data-[state=active]:bg-white
      data-[state=active]:text-black
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
      text-zinc-400
      hover:text-white hover:bg-white/5
      data-[state=active]:bg-white
      data-[state=active]:text-black
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
      <Card className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <CardHeader className="border-b border-white/5 bg-gradient-to-r from-zinc-900/80 via-zinc-950 to-zinc-900/80 px-5 py-5 sm:px-6 md:px-8">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              Basic Summary
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400 sm:text-sm">
              Types, nulls, and unique counts per column
            </CardDescription>
          </div>
        </CardHeader>
 
        <CardContent className="p-0">
          <div className="relative w-full overflow-hidden">
            {/* Right-edge fade on mobile */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-r from-transparent to-zinc-950/80 sm:hidden"
              aria-hidden="true"
            />
 
            <ScrollArea className="h-[min(60vh,420px)] w-full">
              <Table className="min-w-[500px]">
                <TableHeader className="sticky top-0 z-20">
                  <TableRow className=" border-b border-white/10 bg-zinc-950/95 shadow-sm backdrop-blur-xl hover:bg-zinc-950/95">
                    <TableHead className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]">
                      Column
                    </TableHead>
                    <TableHead className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]">
                      Type
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]">
                      Nulls
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]">
                      Unique
                    </TableHead>
                  </TableRow>
                </TableHeader>
 
                <TableBody>
                  {basic_summary.map((item) => (
                    <TableRow
                      key={item.column}
                      className="group border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                    >
                      <TableCell className="px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors group-hover:text-white md:px-6 md:py-4 md:text-sm">
                        {item.column}
                      </TableCell>
                      <TableCell className="px-4 py-2.5 md:px-6 md:py-4">
                        <Badge
                          variant="outline"
                          className="border-zinc-700 bg-zinc-800/60 text-[10px] text-zinc-300 md:text-xs"
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-zinc-400 transition-colors group-hover:text-zinc-200 md:px-6 md:py-4 md:text-sm">
                        {item.nulls.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-zinc-400 transition-colors group-hover:text-zinc-200 md:px-6 md:py-4 md:text-sm">
                        {item.unique.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
 
            {/* Mobile scroll hint */}
            <div className="flex items-center gap-1.5 border-t border-white/[0.04] px-4 py-2 sm:hidden">
              <svg className="h-3 w-3 text-zinc-600 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span className="text-[11px] text-zinc-600">Scroll horizontally to see all columns</span>
            </div>
          </div>
        </CardContent>
      </Card>
 
      {/* ── DATA QUALITY ── */}
      <Card className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <CardHeader className="border-b border-white/5 bg-gradient-to-r from-zinc-900/80 via-zinc-950 to-zinc-900/80 px-5 py-5 sm:px-6 md:px-8">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              Data Quality
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400 sm:text-sm">
              Missing values by column
            </CardDescription>
          </div>
        </CardHeader>
 
        <CardContent className="p-0">
          <div className="relative w-full overflow-hidden">
            {/* Right-edge fade on mobile */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-r from-transparent to-zinc-950/80 sm:hidden"
              aria-hidden="true"
            />
 
            <ScrollArea className="h-[min(60vh,420px)] w-full">
              <Table className="min-w-[400px]">
                <TableHeader className="sticky top-0 z-20">
                  <TableRow className="border-b border-white/10 bg-zinc-950/95 shadow-sm backdrop-blur-xl hover:bg-zinc-950/95">
                    <TableHead className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]">
                      Column
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]">
                      Missing
                    </TableHead>
                    <TableHead className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]">
                      %
                    </TableHead>
                    <TableHead className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]">
                      Health
                    </TableHead>
                  </TableRow>
                </TableHeader>
 
                <TableBody>
                  {data_quality.map((item) => (
                    <TableRow
                      key={item.column}
                      className="group border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                    >
                      <TableCell className="px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors group-hover:text-white md:px-6 md:py-4 md:text-sm">
                        {item.column}
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-zinc-400 transition-colors group-hover:text-zinc-200 md:px-6 md:py-4 md:text-sm">
                        {item.missing.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right font-mono text-xs text-zinc-400 transition-colors group-hover:text-zinc-200 md:px-6 md:py-4 md:text-sm">
                        {Number.isInteger(item.percent)
                          ? item.percent.toLocaleString()
                          : item.percent.toFixed(2)}
                        %
                      </TableCell>
                      <TableCell className="px-4 py-2.5 md:px-6 md:py-4">
                        <div className="flex items-center gap-2">
                          {/* Progress bar */}
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-800 sm:w-24">
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
                                ? "border-green-800 bg-green-950/60 text-green-400"
                                : item.percent < 5
                                ? "border-lime-800 bg-lime-950/60 text-lime-400"
                                : item.percent < 20
                                ? "border-amber-800 bg-amber-950/60 text-amber-400"
                                : "border-red-800 bg-red-950/60 text-red-400"
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
            <div className="flex items-center gap-1.5 border-t border-white/[0.04] px-4 py-2 sm:hidden">
              <svg className="h-3 w-3 text-zinc-600 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <span className="text-[11px] text-zinc-600">Scroll horizontally to see all columns</span>
            </div>
          </div>
        </CardContent>
      </Card>
 
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
                          <TableHead className="text-zinc-400">
                            Column
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Min
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Max
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Mean
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Median
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Std Dev
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Outliers
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Skewness
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Shape
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(numerical_analysis).map(
                          ([col, stats]) => (
                            <TableRow
                              key={col}
                              className="border-zinc-800 hover:bg-zinc-900"
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

              <Card className="bg-black border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Categorical Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(categorical_analysis).map(
                      ([col, stats]) => (
                        <div
                          key={col}
                          className="p-4 border border-zinc-800 rounded-md bg-zinc-950"
                        >
                          <h4 className="font-semibold mb-2">{col}</h4>
                          <div className="text-sm text-zinc-400 flex justify-between mb-2">
                            <span>
                              Top Category:{" "}
                              <strong className="text-white">
                                {stats.top_category || "N/A"}
                              </strong>
                            </span>
                            <span>{formatNum(stats.top_freq_percent)}%</span>
                          </div>
                          <div className="text-xs text-zinc-500 space-y-1">
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
                <Card className="bg-black border-zinc-800 text-white">
                  <CardHeader>
                    <CardTitle>Strong Correlations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader className="border-zinc-800">
                        <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                          <TableHead className="text-zinc-400">
                            Feature 1
                          </TableHead>
                          <TableHead className="text-zinc-400">
                            Feature 2
                          </TableHead>
                          <TableHead className="text-zinc-400 text-right">
                            Score
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {correlations.strong_relationships.map((rel, idx) => (
                          <TableRow
                            key={idx}
                            className="border-zinc-800 hover:bg-zinc-900"
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

                <Card className="bg-black border-zinc-800 text-white">
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
                          stroke="#27272a"
                          horizontal={false}
                        />
                        <XAxis type="number" stroke="#a1a1aa" />
                        <YAxis
                          dataKey="feature"
                          type="category"
                          stroke="#a1a1aa"
                          fontSize={12}
                        />
                        <Tooltip
                          cursor={{ fill: "#27272a" }}
                          contentStyle={{
                            backgroundColor: "#09090b",
                            borderColor: "#27272a",
                          }}
                        />
                        <Bar
                          dataKey="importance"
                          fill="#ffffff"
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
                        stroke="#27272a"
                        vertical={false}
                      />
                      <XAxis dataKey="range" stroke="#a1a1aa" fontSize={12} />
                      <YAxis stroke="#a1a1aa" fontSize={12} />
                      <Tooltip
                        cursor={{ fill: "#27272a" }}
                        contentStyle={{
                          backgroundColor: "#09090b",
                          borderColor: "#27272a",
                        }}
                      />
                      <Bar dataKey="count" fill="#ffffff" />
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
                          stroke="#27272a"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="category"
                          stroke="#a1a1aa"
                          fontSize={12}
                        />
                        <YAxis stroke="#a1a1aa" fontSize={12} />
                        <Tooltip
                          cursor={{ fill: "#27272a" }}
                          contentStyle={{
                            backgroundColor: "#09090b",
                            borderColor: "#27272a",
                          }}
                        />
                        <Bar dataKey="count" fill="#a3a3a3" />
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
                        <CartesianGrid stroke="#27272a" />
                        <XAxis
                          dataKey="x"
                          type="number"
                          name="X"
                          stroke="#a1a1aa"
                        />
                        <YAxis
                          dataKey="y"
                          type="number"
                          name="Y"
                          stroke="#a1a1aa"
                        />
                        <Tooltip
                          cursor={{ strokeDasharray: "3 3" }}
                          contentStyle={{
                            backgroundColor: "#09090b",
                            borderColor: "#27272a",
                          }}
                        />
                        <Scatter name={name} data={data} fill="#ffffff" />
                      </ScatterChart>
                    </ChartCard>
                  ),
                )}
              </div>

              {/* Custom BoxPlots (CSS Based since Recharts lacks native boxplot) */}
              <Card className="bg-black border-zinc-800 text-white">
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
                          className="p-4 border border-zinc-800 rounded-lg flex flex-col items-center"
                        >
                          <h4 className="mb-4 text-sm font-semibold">{col}</h4>
                          <div className="relative w-full h-8 flex items-center px-4">
                            {/* Whisker Line */}
                            <div className="absolute left-4 right-4 h-px bg-zinc-600 top-1/2" />
                            {/* Box (Q1 to Q3) */}
                            <div
                              className="absolute h-full bg-zinc-800 border-2 border-white top-0"
                              style={{
                                left: `${boxLeft}%`,
                                width: `${boxWidth}%`,
                              }}
                            >
                              {/* Median Line */}
                              <div
                                className="absolute w-1 bg-white h-full top-0"
                                style={{
                                  left: `${medianLeft}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-full flex justify-between text-xs text-zinc-500 mt-2">
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
              <Card className="bg-black border-zinc-800 text-white">
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
                          className="w-24 h-24 border border-zinc-800 flex flex-col items-center justify-center text-xs p-1 text-center transition-colors"
                          style={{
                            backgroundColor: `rgba(255, 255, 255, ${intensity * 0.9})`,
                          }}
                        >
                          <span className="mix-blend-difference text-white font-bold">
                            {item.x} x {item.y}
                          </span>
                          <span className="mix-blend-difference text-white">
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
      <Card className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 shadow-2xl shadow-black/50 backdrop-blur-xl">
 
        {/* ── HEADER ── */}
        <CardHeader className="border-b border-white/5 bg-gradient-to-r from-zinc-900/80 via-zinc-950 to-zinc-900/80 px-5 py-5 sm:px-6 md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
 
            {/* Title & Description */}
            <div className="min-w-0 space-y-1">
              <CardTitle className="text-lg font-semibold tracking-tight text-white sm:text-xl md:text-2xl">
                Dataset Preview
              </CardTitle>
              <CardDescription className="text-xs text-zinc-400 sm:text-sm">
                Explore the first rows of your uploaded dataset
              </CardDescription>
            </div>
 
            {/* Stats Grid */}
            <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:min-w-[220px] lg:flex-shrink-0">
              <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:text-xs">
                  Rows
                </span>
                <span className="mt-0.5 text-lg font-semibold tabular-nums text-white sm:text-xl">
                  {data.preview?.length ?? 0}
                </span>
              </div>
 
              <div className="flex flex-col justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:text-xs">
                  Columns
                </span>
                <span className="mt-0.5 text-lg font-semibold tabular-nums text-white sm:text-xl">
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
            <div className="flex h-[300px] flex-col items-center justify-center gap-3 text-zinc-500 sm:h-[400px]">
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
              <p className="text-xs text-zinc-500 sm:text-sm">
                No dataset information available to preview.
              </p>
            </div>
 
          ) : (
 
            /* Data Table */
            <div className="relative w-full overflow-hidden">
              {/* Right-edge fade hint on small screens */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-r from-transparent to-zinc-950/80 sm:hidden"
                aria-hidden="true"
              />
 
              <ScrollArea className="h-[min(65vh,500px)] w-full md:h-[min(65vh,650px)]">
                {/* min-w forces horizontal scroll rather than squishing */}
                <Table className="min-w-[640px]">
 
                  <TableHeader className="sticky top-0 z-20">
                    <TableRow className="border-b border-white/10 bg-zinc-950/95 shadow-sm backdrop-blur-xl hover:bg-zinc-950/95">
                      {Object.keys(preview[0]).map((key) => (
                        <TableHead
                          key={key}
                          className="whitespace-nowrap px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 md:px-6 md:py-4 md:text-[11px]"
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
                        className="group border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                      >
                        {Object.values(row).map((val, cellIndex) => (
                          <TableCell
                            key={cellIndex}
                            className="max-w-[160px] truncate whitespace-nowrap px-4 py-2.5 text-xs text-zinc-400 transition-colors group-hover:text-zinc-200 md:max-w-[200px] md:px-6 md:py-4 md:text-sm"
                          >
                            {typeof val === "number" ? (
                              <span className="font-mono text-zinc-300 group-hover:text-white">
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
              <div className="flex items-center gap-1.5 border-t border-white/[0.04] px-4 py-2 sm:hidden">
                <ArrowRight className="h-3 w-3 text-zinc-600 opacity-60" />
                <span className="text-[11px] text-zinc-600">
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
    <Card className="bg-black border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400 uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">
          {typeof value === "number" ? value.toLocaleString() : (value ?? "—")}
        </div>
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
