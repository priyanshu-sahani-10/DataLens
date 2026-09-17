"use client";
import React from "react";

export function Hero() {
  return (
    <div
      className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-gradient-to-b from-cyan-50 via-sky-50 to-white antialiased relative overflow-hidden">
      {/* Soft cyan ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 45% at 50% 38%, rgba(8,145,178,0.14) 0%, transparent 70%)",
        }}
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1
          className="font-display text-4xl sm:text-6xl  md:text-7xl lg:text-8xl font-bold text-center text-slate-900 pb-10">
          Turn Raw Data  <br /> Into
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"> Actionable Insight.</span>
        </h1>
        <p
          className="mt-4 font-normal text-base text-slate-600 max-w-lg text-center mx-auto">
          Upload your CSV and get instant analysis, beautiful visualizations, and smart insights in seconds.
        </p>
      </div>
    </div>
  );
}
