import { BestSellers } from "@/components/sections/best-sellers";
import { Deals } from "@/components/sections/deals";
import { Featured } from "@/components/sections/featured";
import { Reviews } from "@/components/sections/reviews";
import { Newsletter } from "@/components/sections/newsletter";
import { Hero } from "@/components/hero";
import { CategoriesGrid } from "@/components/categories-grid";

export default function Home() {
  return (
    <div className="space-y-16 pb-20">
      <Hero />
      <CategoriesGrid />
      <Featured />
      <BestSellers />
      <Deals />
      <Reviews />
      <Newsletter />
    </div>
  );
}
