import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const steps = [
  {
    n: "01",
    title: "Upload your data",
    desc: "Upload your CSV file in seconds. Our system securely ingests and prepares your dataset for instant analysis—no setup or technical skills required.",
  },
  {
    n: "02",
    title: "Analyze the data",
    desc: "Automatically detect missing values, data types, distributions, and key patterns. Get a complete overview of your dataset with smart backend analysis.",
  },
  {
    n: "03",
    title: "Visualize",
    desc: "Explore your data through interactive charts and variance analysis. Instantly generate graphs to uncover trends, correlations, and outliers.",
  },
  {
    n: "04",
    title: "Ask questions",
    desc: "Ask questions in plain English and get insights instantly. Query your data without SQL and uncover answers in seconds.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-50 py-28 flex justify-center">
      <div className="max-w-6xl w-full px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2
            className="text-slate-900 font-display font-bold mb-4"
            style={{
              fontSize: "clamp(3rem, 4vw,4rem)",
            }}
          >
            From Raw Data to<br />
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Insight in Minutes
            </span>
          </h2>

          <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
            A streamlined four-step workflow that gets your entire team from question to answer, fast.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col items-center">
          
          {/* Connector line (centered) */}
          <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-cyan-500/60 to-transparent" />

          <div className="w-full">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex flex-col items-center text-center py-12 border-b border-slate-200 last:border-0 group"
              >
                <div className="w-12 h-12 rounded-full border border-cyan-200 bg-white flex items-center justify-center mb-4 group-hover:border-cyan-500 group-hover:shadow-[0_4px_20px_rgba(8,145,178,0.25)] transition-all">
                  <span
                    className="text-cyan-700 text-sm font-bold font-display"
                  >
                    {s.n}
                  </span>
                </div>

                <h3
                  className="text-slate-900 font-display font-bold text-lg mb-2"
                >
                  {s.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
