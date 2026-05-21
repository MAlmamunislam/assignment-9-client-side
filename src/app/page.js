import BannerSlider from "@/component/BanarSilde";
import HomeFooter from "@/component/HomeFotter";

import LimitedCard from "@/component/LimitedCard/LimitedCard";
import { Button } from "@heroui/react";
import { Flame, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div >

{/* banar slider  */}
      <div className="container items-center justify-between mx-auto">
        <BannerSlider />
      </div>

      <div className="container mx-auto flex justify-between py-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Flame className="text-orange-500" /> Trending Ideas
        </h2>
        <Link href={'/ideas'} variant="none" className="text-sm text-purple-600 flex items-center justify-center gap-2 md:text-xl font-bold ">View All Ideas  <MoveRight /> </Link>
      </div>
      {/* card section  */}
      <div className="container mx-auto">
        <LimitedCard></LimitedCard>
      </div>
      <div>
        <HomeFooter />
      </div>
    </div>
  );
}
