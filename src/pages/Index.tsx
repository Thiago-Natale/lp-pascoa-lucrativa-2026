import { useState } from "react";
import UrgencyBar from "@/components/landing/UrgencyBar";
import ScrollProgress from "@/components/landing/ScrollProgress";
import HeroHeadline from "@/components/landing/HeroHeadline";
import PainPoint from "@/components/landing/PainPoint";
import RecipeCards from "@/components/landing/RecipeCards";
import FinancialProjection from "@/components/landing/FinancialProjection";
import SocialProof from "@/components/landing/SocialProof";
import PriceAnchor from "@/components/landing/PriceAnchor";
import OrderBump from "@/components/landing/OrderBump";
import Guarantee from "@/components/landing/Guarantee";
import CountdownTimer from "@/components/landing/CountdownTimer";
import FinalCTA from "@/components/landing/FinalCTA";
import FloatingCTA from "@/components/landing/FloatingCTA";

const Index = () => {
  const [orderBump, setOrderBump] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--creme)" }}>
      {/* Mobile frame on desktop */}
      <div className="mx-auto max-w-[480px] relative" style={{ backgroundColor: "var(--creme)" }}>
        <UrgencyBar />
        <ScrollProgress />

        <div className="flex flex-col" style={{ gap: 56 }}>
          <HeroHeadline />
          <PainPoint />
          <RecipeCards />
          <FinancialProjection />
          <SocialProof />
          <PriceAnchor />
          <OrderBump checked={orderBump} onChange={setOrderBump} />
          <Guarantee />
          <CountdownTimer />
          <FinalCTA orderBump={orderBump} onOrderBumpChange={setOrderBump} />
        </div>

        <FloatingCTA />
      </div>
    </div>
  );
};

export default Index;
