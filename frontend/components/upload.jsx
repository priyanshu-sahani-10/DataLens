"use client";
import { useRouter } from "next/navigation";

export function UploadCTA() {
  const router = useRouter();

  return (
    <section className="bg-black py-32 flex justify-center">
      <div className="max-w-4xl w-full text-center px-6">
        
        <h2 className="text-white font-black text-3xl md:text-5xl mb-6">
          Start Analyzing Your Data
        </h2>

        <p className="text-white/40 max-w-xl mx-auto mb-10">
          Upload your CSV and get instant insights, visualizations, and AI-powered answers in seconds.
        </p>

        <button
          onClick={() => router.push("/upload")}
          className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
        >
          Upload Your Data →
        </button>

      </div>
    </section>
  );
}