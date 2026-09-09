"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";

export function Hero() {
  return (
    <div
      className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1
          className="text-4xl sm:text-6xl  md:text-7xl lg:text-8xl font-bold text-center bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-700 bg-opacity-50 pb-10">
          Turn Raw Data  <br /> Into
Actionable Insight.
        </h1>
        <p
          className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          A subtle yet effective spotlight effect, because the previous version
          is used a bit too much these days.
        </p>
      </div>
    </div>
  );
}
