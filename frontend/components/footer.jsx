"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-white text-slate-600 px-10 pt-20 overflow-hidden border-t border-slate-200">

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Left Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-600 text-white font-bold w-8 h-8 flex items-center justify-center rounded">
              D
            </div>
            <h2 className="text-lg font-semibold font-display text-slate-900">DataLens</h2>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} DataLens. All rights reserved.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-slate-900">Pages</h3>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>All Products</li>
            <li>Studio</li>
            <li>Clients</li>
            <li>Pricing</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-slate-900">Socials</h3>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-slate-900">Legal</h3>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

      </div>

      {/* Big Text — now at the bottom in normal flow */}
      <div className="flex justify-center overflow-hidden mt-6 leading-none">
        <h1 className="font-display text-[120px] md:text-[180px] font-bold bg-gradient-to-b from-cyan-200/80 to-slate-100 bg-clip-text text-transparent select-none whitespace-nowrap">
  DataLens
</h1>
      </div>

    </footer>
  );
}
