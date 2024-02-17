import HeroLanding from "@/components/ui/commons/HeroLanding";
import AffiliateHandler from "@/components/core/AffiliateHandler";
import CTAOffer from "@/components/ui/commons/CTAOffer";

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
      {/* <div className="bg-white flex">
        <div className="hidden lg:flex   mx-auto">
          <TestimonialMultiple />
        </div>
        <div className="lg:hidden flex  mx-auto">
          <TestimonialMultipleMobile />
        </div>
      </div> */}
      <div>
        <div className="  mx-auto">
          <CTAOffer />
        </div>
      </div>{" "}
  
       
      <AffiliateHandler aff={searchParams.aff} currentUser={null} />
    </div>
  );
}
