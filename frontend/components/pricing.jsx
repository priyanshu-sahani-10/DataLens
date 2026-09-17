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
      { t: "Smart Insights Engine", ok: false },
      { t: "Outlier Detection", ok: false },
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
      { t: "Smart Insights Engine", ok: true },
      { t: "Outlier Detection", ok: true },
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
    <section className="bg-white py-28 px-[5%] border-y border-slate-200">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="border-cyan-200 text-cyan-700 bg-cyan-50 uppercase tracking-widest text-[11px] px-4 py-1 mb-6">
            💳 Pricing
          </Badge>
          <h2
            className="text-slate-900 font-display font-bold mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
            Start free and scale as your team grows. No hidden fees, no data limits on paid plans.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 bg-white ${
                plan.featured
                  ? "border-cyan-500 shadow-[0_8px_40px_rgba(8,145,178,0.15)]"
                  : "border-slate-200 shadow-sm hover:border-cyan-300 hover:shadow-md"
              }`}
            >
              {/* Featured top line */}
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-t-2xl" />
              )}

              {plan.badge && (
                <span className="inline-block bg-cyan-100 border border-cyan-200 text-cyan-800 text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-5">
                  {plan.badge}
                </span>
              )}

              <h3
                className="text-slate-900 font-display font-bold text-lg mb-1.5"
              >
                {plan.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{plan.desc}</p>

              <div className="flex items-baseline gap-1 mb-1">
                {plan.price !== null ? (
                  <>
                    <span className="text-cyan-700 text-lg font-semibold font-display">$</span>
                    <span className="text-slate-900 font-display font-bold text-5xl">{plan.price}</span>
                    <span className="text-slate-500 text-sm">/mo</span>
                  </>
                ) : (
                  <span className="text-slate-900 font-display font-bold text-3xl">Custom</span>
                )}
              </div>

              <Separator className="my-6 bg-slate-200" />

              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f.t} className="flex items-center gap-2.5 text-sm">
                    {f.ok ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5L12 3.5" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="#CBD5E1" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    )}
                    <span className={f.ok ? "text-slate-700" : "text-slate-400"}>{f.t}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-11 font-medium ${
                  plan.featured
                    ? "bg-cyan-600 text-white hover:bg-cyan-700 font-semibold shadow-[0_4px_20px_rgba(8,145,178,0.35)]"
                    : "bg-white border border-slate-300 text-slate-700 hover:text-cyan-700 hover:border-cyan-400 hover:bg-cyan-50"
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
