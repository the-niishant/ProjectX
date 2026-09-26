import React, { useEffect } from "react";
import { SareeHero } from "../components/SareeHero";
import { FeaturedSareeShowcase } from "../components/FeaturedSareeShowcase";
import { NewArrivals } from "../components/NewArrivals";
import { OccasionBento } from "../components/OccasionBento";
import { CraftSection } from "../components/CraftSection";
import { FabricExplorer } from "../components/FabricExplorer";
import { Lookbook } from "../components/Lookbook";
import { ShopTheLook } from "../components/ShopTheLook";
import { ProductRail } from "../components/ProductRail";
import { Testimonials } from "../components/Testimonials";
import { InstagramMarquee } from "../components/InstagramMarquee";
import { trackEvent } from "../utils/analytics";

export function Home() {
  useEffect(() => {
    trackEvent("view_home", { timestamp: Date.now() });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="luxury-home-flow">
      {/* 1. Cinematic Full-Viewport Hero with Rounded Frame Transformation */}
      <SareeHero />

      {/* 2. Pinned 5-Saree Showcase with Scroll-Driven Swap & Segmented Progress */}
      <FeaturedSareeShowcase />

      {/* 3. New Arrivals 4-Column Grid with 3:4 Cards and Crossfade */}
      <NewArrivals />

      {/* 4. Shop by Occasion Bento Editorial Grid */}
      <OccasionBento />

      {/* 5. The Art of the Saree Split Pinned Craft Section with Ken-Burns & Counters */}
      <CraftSection />

      {/* 6. Interactive Fabric Texture Explorer with Crossfade & Recommendations */}
      <FabricExplorer />

      {/* 7. Pinned Lookbook with Horizontal Scroll Translation & Parallax */}
      <Lookbook />

      {/* 8. Styled Silhouette "Shop the Look" with Interactive Hotspots */}
      <ShopTheLook />

      {/* 9. Bestsellers Horizontal Scroll Product Rail */}
      <ProductRail />

      {/* 10. Testimonials with Offset Middle Card */}
      <Testimonials />

      {/* 11. Velocity-Reactive Infinite Instagram Marquee */}
      <InstagramMarquee />
    </div>
  );
}
