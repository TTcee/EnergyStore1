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
    <main className="max-w-100% overflow-x-hidden">
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
