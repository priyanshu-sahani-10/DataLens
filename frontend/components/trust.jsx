import { Separator } from "@/components/ui/separator";

const companies = ["Vercel", "Stripe", "Notion", "Linear", "Figma", "Shopify", "Atlassian"];

export function TrustBar() {
  return (
    <section className="bg-white border-y border-slate-200 py-10 px-[5%]">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <p className="text-slate-400 text-xs uppercase tracking-[0.12em]">
          Trusted by data teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {companies.map((name) => (
            <span
              key={name}
              className="text-slate-400 hover:text-cyan-700 transition-colors cursor-default text-lg font-bold tracking-tight font-display"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}