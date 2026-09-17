"use client";
import { useRouter } from "next/navigation";

export function UploadCTA() {
  const router = useRouter();

  return (
    <section className="bg-slate-50 py-32 flex justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(8,145,178,0.1) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-4xl w-full text-center px-6 relative z-10">
        
        <h2 className="text-slate-900 font-display font-bold text-3xl md:text-5xl mb-6">
          Start Analyzing Your Data
        </h2>

        <p className="text-slate-600 max-w-xl mx-auto mb-10">
          Upload your CSV and get instant insights, visualizations, and plain-English summaries in seconds.
        </p>

        <button
          onClick={() => router.push("/upload")}
          className="px-8 py-4 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition shadow-[0_8px_30px_rgba(8,145,178,0.35)]"
        >
          Upload Your Data →
        </button>

      </div>
    </section>
  );
}
