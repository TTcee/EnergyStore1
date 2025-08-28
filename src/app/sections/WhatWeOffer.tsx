import Link from "next/link";

// Типи для компонента карток послуг
interface ServiceCardProps {
  title: string;
  description: string;
  buttonText?: string;
  href: string;
}

// Компонент картки послуги
const ServiceCard = ({ 
  title, 
  description, 
  buttonText = "Переглянути",
  href 
}: ServiceCardProps) => {
  return (
    <div className=" w-[528px] h-[350px] left-[211px] top-[1870px] 
             bg-[linear-gradient(110.99deg,rgba(255,255,255,0.08)_-24.09%,rgba(115,115,115,0.04)_118.13%)] 
             backdrop-blur-[9px] rounded-[6px] pl-10 pt-15 pr-10 mt-8" style={{
    border: "2px solid transparent",
    WebkitMaskImage: "-webkit-radial-gradient(white, black)",
    borderRadius: "20px"

  }}>
      {/* Назва послуги */}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>

      {/* Опис */}
      <p className="text-gray-300 text-base leading-relaxed mb-8">
        {description}
      </p>

      {/* Кнопка з стрілкою */}
      <Link href={href}>
        <div className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors cursor-pointer group">
          <span className="mr-4 font-medium">{buttonText}</span>
          <div className="flex items-center">
            <div className="w-25"><img src="/arrowleft.png" alt="" /></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function WhatWeOffer() {
  const services = [
    {
      title: "Ремонтні послуги",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      href: "/services/repair"
    },
    {
      title: "Виробничі послуги",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      href: "/services/production"
    }
  ];

  return (
    <section 
      id="offer" 
      className="min-h-screen flex flex-col items-center justify-center  text-white py-16 px-4 relative overflow-hidden"
    >
            <img src="/shademain2.png" alt="Моє зображення" className="absolute w-150 z-[-9] mt-[-300] ml-300" />

      {/* Декоративні точки */}
      <div>      <img src="/dots.png" alt="dots" className="absolute w-130 ml-[-630] mt-18" /></div>
            <div>      <img src="/dots.png" alt="dots" className="absolute w-130 ml-20 mt-49 scale-x-[-1] scale-y-[-1]" /></div>


      {/* Заголовок */}
      <h2 className="text-3xl font-semibold mb-12 ml-[-880]">
        Що ми пропонуємо
      </h2>

      {/* Картки послуг */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full relative z-10 ">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            href={service.href}
          />
        ))}
      </div>
    </section>
  );
}