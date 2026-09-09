import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const plans = [
  {
    name: "Starter",
    price: "0",
    desc: "Perfect for individuals and small teams exploring data analytics.",
    features: [
      { t: "Up to 3 data sources", ok: true },
      { t: "5 dashboards", ok: true },
      { t: "10K rows / query", ok: true },
      { t: "Community support", ok: true },
      { t: "AI Query Assistant", ok: false },
      { t: "Predictive Modeling", ok: false },
      { t: "SSO / SAML", ok: false },
    ],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "79",
    desc: "For growing teams that need power, speed, and collaboration.",
    features: [
      { t: "Unlimited data sources", ok: true },
      { t: "Unlimited dashboards", ok: true },
      { t: "10M rows / query", ok: true },
      { t: "Priority support", ok: true },
      { t: "AI Query Assistant", ok: true },
      { t: "Predictive Modeling", ok: true },
      { t: "SSO / SAML", ok: false },
    ],
    cta: "Start Pro Trial",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: null,
    desc: "Custom deployments for organizations with strict compliance needs.",
    features: [
      { t: "Everything in Pro", ok: true },
      { t: "Unlimited seats", ok: true },
      { t: "On-premise deployment", ok: true },
      { t: "Dedicated SLA", ok: true },
      { t: "SSO / SAML / SCIM", ok: true },
      { t: "Data residency controls", ok: true },
      { t: "Audit logs & compliance", ok: true },
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section className="bg-[#080808] py-28 px-[5%] border-y border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="border-white/10 text-white/35 bg-white/[0.03] uppercase tracking-widest text-[11px] px-4 py-1 mb-6">
            💳 Pricing
          </Badge>
          <h2
            className="text-white font-black mb-4"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-white/35 max-w-md mx-auto leading-relaxed">
            Start free and scale as your team grows. No hidden fees, no data limits on paid plans.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-white/25 bg-white/[0.04]"
                  : "border-white/[0.07] bg-black hover:border-white/15"
              }`}
              style={plan.featured ? { boxShadow: "0 0 50px rgba(255,255,255,0.04)" } : {}}
            >
              {/* Featured top line */}
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl" />
              )}

              {plan.badge && (
                <span className="inline-block bg-white/[0.08] border border-white/[0.12] text-white/50 text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-5">
                  {plan.badge}
                </span>
              )}

              <h3
                className="text-white font-bold text-lg mb-1.5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {plan.name}
              </h3>
              <p className="text-white/30 text-sm leading-relaxed mb-6">{plan.desc}</p>

              <div className="flex items-baseline gap-1 mb-1">
                {plan.price !== null ? (
                  <>
                    <span className="text-white/40 text-lg font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>$</span>
                    <span className="text-white font-black text-5xl" style={{ fontFamily: "'Syne', sans-serif" }}>{plan.price}</span>
                    <span className="text-white/25 text-sm">/mo</span>
                  </>
                ) : (
                  <span className="text-white font-black text-3xl" style={{ fontFamily: "'Syne', sans-serif" }}>Custom</span>
                )}
              </div>

              <Separator className="my-6 bg-white/[0.06]" />

              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f.t} className="flex items-center gap-2.5 text-sm">
                    {f.ok ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5L12 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="rgba(255,255,255,0.15)" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    )}
                    <span className={f.ok ? "text-white/50" : "text-white/15"}>{f.t}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-11 font-medium ${
                  plan.featured
                    ? "bg-white text-black hover:bg-white/85"
                    : "bg-transparent border border-white/10 text-white/40 hover:text-white hover:border-white/25 hover:bg-white/[0.04]"
                }`}
                variant={plan.featured ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}