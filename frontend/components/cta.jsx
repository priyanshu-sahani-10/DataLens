import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-[#080808] py-28 px-[5%] border-y border-white/[0.05] relative overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="inline-block border border-white/10 text-white/35 bg-white/[0.03] uppercase tracking-widest text-[11px] px-4 py-1 rounded-full mb-7">
          🚀 Get Started Today
        </span>

        <h2
          className="text-white font-black leading-tight mb-5"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Your Data Has the Answers.{" "}
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}>
            Find Them.
          </span>
        </h2>

        <p className="text-white/35 max-w-xl mx-auto leading-relaxed mb-10">
          Start your free trial today. No credit card required. Full access to all
          Pro features for 14 days.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-5">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/85 font-medium h-12 px-8 text-base"
          >
            Start Free Trial — 14 Days
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/10 text-white/40 hover:text-white hover:bg-white/[0.04] hover:border-white/20 bg-transparent h-12 px-8 text-base"
          >
            Schedule a Demo
          </Button>
        </div>

        <p className="text-white/20 text-xs tracking-wide">
          No credit card required · Cancel anytime · SOC 2 certified
        </p>
      </div>
    </section>
  );
}