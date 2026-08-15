import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { PhraseOfDay } from "@/components/phrase-of-day";
import { AboutSkills, TeachingStrengths } from "@/components/about-skills";
import { Certifications } from "@/components/certifications";
import { Schedule } from "@/components/schedule";
import { Testimonials } from "@/components/testimonials";
import { Booking } from "@/components/booking";
import { SiteFooter } from "@/components/site-footer";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PhraseOfDay />
        <AboutSkills />
        <Certifications />
        <TeachingStrengths />
        <Schedule />
        <Testimonials />
        <Booking />
      </main>
      <SiteFooter />
    </>
  );
}
