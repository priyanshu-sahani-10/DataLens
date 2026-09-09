import Image from "next/image";
import { Hero } from "@/components/hero";
import {FeaturesSection } from "@/components/features";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PricingSection } from "@/components/pricing";
import { TestimonialsSection } from "@/components/testimonal";
import { CTASection } from "@/components/cta";
import { HowItWorks } from "@/components/howitworks";
import { TrustBar } from "@/components/trust";
import { UploadCTA } from "@/components/upload";
export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <section>
      <TrustBar/>
      </section>
      <UploadCTA/>
      <section id="feature">
      <FeaturesSection/>

      </section>
      <section id="how">
      <HowItWorks/>

      </section>
      <section id="pricing">
      <PricingSection/>
      </section>
      <section id="customer">

      <TestimonialsSection/>
      </section>
      <CTASection/>
      <Footer/>
    </div>
  );
}
