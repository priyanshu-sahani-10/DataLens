"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white px-10 pt-20 overflow-hidden">

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Left Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white text-black font-bold w-8 h-8 flex items-center justify-center rounded">
              D
            </div>
            <h2 className="text-lg font-semibold">DataLens</h2>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DataLens. All rights reserved.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Pages</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>All Products</li>
            <li>Studio</li>
            <li>Clients</li>
            <li>Pricing</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Socials</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

      </div>

      {/* Big Text — now at the bottom in normal flow */}
      <div className="flex justify-center overflow-hidden mt-6 leading-none">
        <h1 className="text-[120px] md:text-[180px] font-bold bg-gradient-to-b from-white/11 to-white/2 bg-clip-text text-transparent select-none whitespace-nowrap">
  DataLens
</h1>
      </div>

    </footer>
  );
}