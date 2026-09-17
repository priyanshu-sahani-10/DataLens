import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-cyan-700 via-cyan-600 to-blue-700 py-28 px-[5%] relative overflow-hidden">
      {/* Soft highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="inline-block border border-white/30 text-white bg-white/10 uppercase tracking-widest text-[11px] px-4 py-1 rounded-full mb-7">
          🚀 Get Started Today
        </span>

        <h2
          className="text-white font-display font-bold leading-tight mb-5"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Your Data Has the Answers. Find Them.
        </h2>

        <p className="text-cyan-50 max-w-xl mx-auto leading-relaxed mb-10">
          Start your free trial today. No credit card required. Full access to all
          Pro features for 14 days.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-5">
          <Button
            size="lg"
            className="bg-white text-cyan-800 hover:bg-cyan-50 font-semibold h-12 px-8 text-base shadow-lg"
          >
            Start Free Trial — 14 Days
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/40 text-white hover:text-white hover:bg-white/10 hover:border-white/60 bg-transparent h-12 px-8 text-base"
          >
            Schedule a Demo
          </Button>
        </div>

        <p className="text-cyan-100 text-xs tracking-wide">
          No credit card required · Cancel anytime · SOC 2 certified
        </p>
      </div>
    </section>
  );
}
