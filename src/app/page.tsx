import MainPage from "@sections/MainPage";
import AboutUs from "@sections/AboutUs";
import WhatWeOffer from "@sections/WhatWeOffer";
import ProductionServices from "@sections/ProductionServices";
import RepairServices from "@sections/RepairServices";
import WhyChooseUs from "@sections/WhyChooseUs";
import FindUs from "@sections/FindUs";
import Image from 'next/image';



export default function HomePage() {
  return (
    <main>
      <div className="absolute w-[1597.68px] h-[4737.14px] -left-[47.26px] top-[825.39px] bg-[rgba(0,51,255,0.07)] blur-[102px]"></div>
      <MainPage />
      <AboutUs />
      <WhatWeOffer />
      <ProductionServices />
      <RepairServices />
      <WhyChooseUs />
      <FindUs />
    </main>
  );
}
