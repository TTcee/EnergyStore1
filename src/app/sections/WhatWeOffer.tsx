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
    <div className="w-full max-w-[528px] h-auto min-h-[300px] lg:h-[350px]
             bg-[linear-gradient(110.99deg,rgba(255,255,255,0.08)_-24.09%,rgba(115,115,115,0.04)_118.13%)] 
             backdrop-blur-[9px] rounded-[20px] 
             p-6 sm:p-8 lg:pl-10 lg:pt-12 lg:pr-10 
             mx-auto pt-12 hover:scale-105 transform transition-transform duration-300" 
          style={{
            border: "2px solid transparent",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)"
          }}>
      
      {/* Назва послуги */}
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
        {title}
      </h3>

      {/* Опис */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
        {description}
      </p>

      {/* Кнопка з стрілкою */}
      <Link href={href}>
        <div className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors cursor-pointer group">
          <span className="mr-3 sm:mr-4 font-medium text-sm sm:text-base">{buttonText}</span>
          <div className="flex items-center">
            <div className="w-6 sm:w-8 lg:w-25">
              <img src="/arrowleft.png" alt="arrow" className="w-full h-auto" />
            </div>
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
      description: "Ми виконуємо діагностику та професійний ремонт акумуляторів будь-якої складності. Перепаковуємо старі батареї, відновлюємо їхню ємність і забезпечуємо стабільну роботу. З нами ваш акумулятор знову служитиме довго й надійно.",
      href: "#repair"
    },
    {
      title: "Виробничі послуги",
      description: "Energy Store виготовляє акумулятори під індивідуальні потреби — від електротранспорту до енергосховищ. Ми пропонуємо кастомні рішення у термоусадці чи коробках під замовлення, використовуючи лише якісні літієві елементи.",
      href: "#production"
    }
  ];

  return (
    <section 
      id="offer" 
      className="min-h-screen flex flex-col items-center justify-center text-white py-8 sm:py-16 px-4 relative overflow-hidden snap-start pt-30 lg:pt-20" 
    >
      {/* Фонове зображення - тільки на великих екранах */}
      <img 
        src="/shademain2.png" 
        alt="Background shade" 
        className=" lg:block absolute w-150 z-[-9] mt-[-300] ml-300" 
      />

      {/* Декоративні точки - тільки на великих екранах */}
      <div className="hidden lg:block">
        <img src="/dots.png" alt="dots" className="absolute w-130 ml-[-610] mt-18" />
      </div>
      <div className="hidden lg:block">
        <img src="/dots.png" alt="dots" className="absolute w-130 ml-23 mt-49 scale-x-[-1] scale-y-[-1]" />
      </div>

      {/* Заголовок */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12 
                     text-center lg:text-left lg:self-start lg:ml-36 xl:ml-36
                     px-4 sm:px-0 2xl:ml-85">
        Що ми пропонуємо
      </h2>

      {/* Картки послуг */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 
                      w-full max-w-6xl relative z-10 px-2 sm:px-0 mt-8">
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