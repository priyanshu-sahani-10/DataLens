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
    <section className="bg-slate-50 py-28 px-[5%]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="border-cyan-200 text-cyan-700 bg-cyan-50 uppercase tracking-widest text-[11px] px-4 py-1 mb-6">
            💬 Testimonials
          </Badge>
          <h2
            className="text-slate-900 font-display font-bold mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Loved by Data Teams Worldwide
          </h2>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
            Join thousands of analysts, engineers, and executives who trust Datalytics every day.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:border-cyan-300 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="text-amber-400 text-sm tracking-[3px] mb-5">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed italic mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center flex-shrink-0">
                  <span
                    className="text-cyan-800 text-xs font-bold font-display"
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-semibold font-display">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
