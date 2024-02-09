import CTAMain from "@/components/ui/commons/CTAMain";
import HeroLanding from "@/components/ui/commons/HeroLanding";
import Features from "./ui/Features1Landing";
import Clients from "./ui/Clients";
import CTA1 from "./ui/CTA1";
import HostingPlans from "./ui/HostingPlans";
import AffiliateHandler from "@/components/core/AffiliateHandler";
import TestimonialMultiple from "./ui/TestimonialMultiple";
import AgencyCTA from "./ui/AgencyCTA";
import CTAOffer from "@/components/ui/commons/CTAOffer";
import TestimonialMultipleMobile from "./ui/TestimonialMultipleMobile";

export default function LandingPage({
  searchParams,
}: {
  searchParams: {
    aff: string;
  };
}) {
  return (
    <div className="bg-sky-950">
      <HeroLanding />
      <div className="bg-white flex">
        <div className="hidden lg:flex   mx-auto">
          <TestimonialMultiple />
        </div>
        <div className="lg:hidden flex  mx-auto">
          <TestimonialMultipleMobile />
        </div>
      </div>
      <div>
        <div className="  mx-auto">
          <HostingPlans />
        </div>
      </div>{" "}
      <div>
        <div className="  mx-auto">
          <CTAOffer />
        </div>
      </div>{" "}
      <div>
        <div className=" bg-white mx-auto">
          <CTAMain />
        </div>
      </div>{" "}
      <div className="bg-white ">
        <div className="    mx-auto">
          <Features />
        </div>
      </div>{" "}
      <div className=" bg-white   z-40 relative   mx-auto">
        <Clients />
      </div>{" "}
      <div className="bg-white ">
        <div className="  mx-auto">
          <CTA1 />
        </div>
      </div>{" "}
      <div className="bg-white ">
        <div className="    mx-auto">
          <AgencyCTA />
        </div>
      </div>{" "}
      <AffiliateHandler aff={searchParams.aff} currentUser={null} />
    </div>
  );
}
