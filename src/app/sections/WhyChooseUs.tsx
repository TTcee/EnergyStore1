import { Clock, Award, Settings, Shield } from "lucide-react";

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <Clock className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white-200 flex-shrink-0" />,
      title: "Досвід понад 13 років",
      text: "Маємо понад 13 років досвіду у виробництві та ремонті акумуляторів, тому гарантуємо якість і надійність у кожному рішенні.",
    },
    {
      icon: <Award className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white-200 flex-shrink-0" />,
      title: "Надійність та довговічність",
      text: "Застосовуємо перевірені літієві елементи та сучасне складання, щоб батареї працювали стабільно й витримували складні умови.",
    },
    {
      icon: <Settings className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white-400 flex-shrink-0" />,
      title: "Індивідуальні рішення",
      text: "Розробляємо акумулятори з потрібною ємністю та системою управління живленням під конкретні задачі клієнта.",
    },
    {
      icon: <Shield className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white-400 flex-shrink-0" />,
      title: "Безпека понад усе",
      text: "Наші батареї мають захист від перегріву та перевантаження, що гарантує максимальну безпеку під час використання.",
    },
  ];

  return (
    <section
      id="whyus"
      className="min-h-screen flex items-center justify-center text-white px-6 py-16 relative snap-start"
    >
      {/* Фон */}
      <img src="/shademain2.png" alt="" className="absolute hidden lg:block w-250 z-[-9] ml-[-900] mt-[-600]" />
      <img src="/shademain2.png" alt="" className="absolute hidden lg:block w-150 z-[-9] ml-300" />
      <img src="/shademain2.png" alt="" className="absolute hidden lg:block w-200 z-[-9] ml-[-800] mt-150" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Ліва частина */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Чому обирають нас
          </h2>

          {/* Карточки */}
          <div className="space-y-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5
                           bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(123.63deg,rgba(255,255,255,0.14)_22.7%,rgba(153,153,153,0.04)_99.25%)]
                           shadow-[4px_4px_13px_rgba(0,0,0,0.21)]
                           backdrop-blur-[22.5px]
                           rounded-[10px]
                           box-border
                           border border-white/20
                           w-full overflow-hidden"
              >
                {card.icon}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold break-words">{card.title}</h3>
                  <p className="text-gray-300 text-sm break-words">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Права частина — тільки на десктопі */}
        <div className="relative hidden lg:flex justify-center items-center">
          <img
            src="/dotsForWHYUSPage.png"
            alt="Про нашу компанію"
            className="mt-10 max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
