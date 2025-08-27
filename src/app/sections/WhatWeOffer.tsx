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
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-white hover:bg-gray-750 transition-colors group">
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
            <div className="w-12 h-px bg-green-400 group-hover:bg-green-300 transition-colors"></div>
            <div className="ml-2 w-0 h-0 border-l-[6px] border-l-green-400 group-hover:border-l-green-300 border-y-[4px] border-y-transparent transition-colors"></div>
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
      {/* Декоративні точки */}
      <div className="absolute inset-0 opacity-20">
        {/* Ліва сторона */}
        <div className="absolute left-8 top-1/4 grid grid-cols-8 gap-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={`left-${i}`} className="w-1 h-1 bg-gray-600 rounded-full"></div>
          ))}
        </div>
        
        {/* Права сторона */}
        <div className="absolute right-8 bottom-1/4 grid grid-cols-8 gap-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={`right-${i}`} className="w-1 h-1 bg-gray-600 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Заголовок */}
      <h2 className="text-4xl font-bold mb-16 text-center relative z-10">
        Що ми пропонуємо
      </h2>

      {/* Картки послуг */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full relative z-10">
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