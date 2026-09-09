import { Separator } from "@/components/ui/separator";

const companies = ["Vercel", "Stripe", "Notion", "Linear", "Figma", "Shopify", "Atlassian"];

export function TrustBar() {
  return (
    <section className="bg-[#080808] border-y border-white/[0.06] py-10 px-[5%]">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <p className="text-white/20 text-xs uppercase tracking-[0.12em]">
          Trusted by data teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {companies.map((name) => (
            <span
              key={name}
              className="text-white/15 hover:text-white/35 transition-colors cursor-default text-lg font-bold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}