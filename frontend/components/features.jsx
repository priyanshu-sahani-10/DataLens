import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <rect x="2" y="10" width="4" height="10" rx="1" fill="#0891b2"/>
        <rect x="8" y="6" width="4" height="14" rx="1" fill="#0891b2" opacity="0.6"/>
        <rect x="14" y="2" width="4" height="18" rx="1" fill="#0891b2" opacity="0.35"/>
      </svg>
    ),
    title: "Instant Data Analysis",
    desc: "Automatically analyze your dataset for missing values, distributions, correlations, and key statistical insights in seconds.",
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <circle cx="11" cy="11" r="8" stroke="#0891b2" strokeWidth="1.5"/>
        <path d="M11 7v4l3 2" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Smart Data Insights",
    desc: "Identify trends, anomalies, and patterns automatically. Get meaningful insights without writing a single line of code.",
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <rect x="3" y="3" width="7" height="7" rx="2" fill="#0891b2"/>
        <rect x="12" y="3" width="7" height="7" rx="2" fill="#0891b2" opacity="0.55"/>
        <rect x="3" y="12" width="7" height="7" rx="2" fill="#0891b2" opacity="0.55"/>
        <rect x="12" y="12" width="7" height="7" rx="2" fill="#0891b2" opacity="0.3"/>
      </svg>
    ),
    title: "Interactive Graphs",
    desc: "Visualize your data instantly with dynamic charts. Explore relationships, compare variables, and uncover hidden patterns.",
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <path d="M4 16l4-5 4 3 4-6 3 4" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Variance & Trend Analysis",
    desc: "Understand how your data changes over time. Detect growth, drops, and deviations with clear visual explanations.",
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <path d="M11 3l2 6h6l-5 3.5 2 6L11 15l-5 3.5 2-6L3 9h6z" stroke="#0891b2" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Ask Questions in Plain English",
    desc: "Query your data using natural language. Instantly get answers, summaries, and insights without SQL or technical knowledge.",
  },
  {
    icon: (
      <svg viewBox="0 0 22 22" fill="none" width="20" height="20">
        <path d="M11 3v4M11 15v4M3 11h4M15 11h4" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="3" stroke="#0891b2" strokeWidth="1.5"/>
      </svg>
    ),
    title: "AI Recommendations",
    desc: "Go beyond insights. Get actionable suggestions on what to improve, optimize, or investigate based on your data.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-28 px-[5%]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="border-cyan-200 text-cyan-700 bg-cyan-50 uppercase tracking-widest text-[11px] px-4 py-1 mb-6"
          >
            ⚡ Platform Features
          </Badge>
          <h2
            className="text-slate-900 font-display font-bold mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Everything Your Data Team Needs
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
            From ingestion to visualization, Datalytics handles the full analytics
            lifecycle with enterprise-grade reliability.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-slate-200"
          style={{ gap: "1px", background: "var(--color-border)" }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-9 group hover:bg-cyan-50/60 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <h3
                className="text-slate-900 font-display font-bold text-base mb-2.5"
              >
                {f.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
