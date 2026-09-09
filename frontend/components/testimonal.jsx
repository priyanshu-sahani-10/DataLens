import { Badge } from "@/components/ui/badge";

const testimonials = [
  { quote: "We replaced three separate BI tools with Datalytics. Reporting time dropped from days to hours and dashboards look good enough to present to the board.", name: "Sarah Reynolds", role: "Head of Data, Vercel", initials: "SR" },
  { quote: "The AI Query Assistant is genuinely magical. Product managers now answer their own data questions without filing tickets — that alone paid for the subscription 10x.", name: "Marcus Kim", role: "VP Engineering, Stripe", initials: "MK" },
  { quote: "Real-time dashboards with sub-second latency on 50 million events per day. I didn't think that was possible at this price point. Datalytics proved me wrong.", name: "Aisha Patel", role: "Data Architect, Shopify", initials: "AP" },
  { quote: "Onboarding took less than a day. We connected Snowflake, Salesforce, and Stripe before lunch and had our first revenue dashboard live by EOD.", name: "Tom Nguyen", role: "Analytics Lead, Linear", initials: "TN" },
  { quote: "Predictive modeling caught a churn spike two weeks early. We ran a re-engagement campaign and saved over $200K in ARR. The ROI is insane.", name: "Julia Larson", role: "Growth Director, Notion", initials: "JL" },
  { quote: "SOC 2 compliance, row-level security, and audit logs were non-negotiable for us. Datalytics had it all out of the box. Security team signed off in one review.", name: "Ryan Chen", role: "CISO, Atlassian", initials: "RC" },
];

export function TestimonialsSection() {
  return (
    <section className="bg-black py-28 px-[5%]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="border-white/10 text-white/35 bg-white/[0.03] uppercase tracking-widest text-[11px] px-4 py-1 mb-6">
            💬 Testimonials
          </Badge>
          <h2
            className="text-white font-black mb-4"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Loved by Data Teams Worldwide
          </h2>
          <p className="text-white/35 max-w-md mx-auto leading-relaxed">
            Join thousands of analysts, engineers, and executives who trust Datalytics every day.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#080808] border border-white/[0.06] rounded-2xl p-7 hover:border-white/[0.14] hover:-translate-y-1 hover:bg-white/[0.025] transition-all duration-300"
            >
              <div className="text-white/20 text-sm tracking-[3px] mb-5">★★★★★</div>
              <p className="text-white/40 text-sm leading-relaxed italic mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-white/50 text-xs font-bold"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>{t.name}</p>
                  <p className="text-white/25 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}