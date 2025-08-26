import { Clock, Award, Settings, Shield } from "lucide-react";

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <Clock className="w-8 h-8 text-yellow-400 mr-4" />,
      title: "Досвід понад 13 років",
      text: "Маємо понад 13 років досвіду у виробництві та ремонті акумуляторів, тому гарантуємо якість і надійність у кожному рішенні.",
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-400 mr-4" />,
      title: "Надійність та довговічність",
      text: "Застосовуємо перевірені літієві елементи та сучасне складання, щоб батареї працювали стабільно й витримували складні умови.",
    },
    {
      icon: <Settings className="w-8 h-8 text-yellow-400 mr-4" />,
      title: "Індивідуальні рішення",
      text: "Розробляємо акумулятори з потрібною ємністю та системою управління живленням під конкретні задачі клієнта.",
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-400 mr-4" />,
      title: "Безпека понад усе",
      text: "Наші батареї мають захист від перегріву та перевантаження, що гарантує максимальну безпеку під час використання.",
    },
  ];

  return (
    <section
      id="whyus"
      className="min-h-screen flex items-center justify-center text-white px-6 py-16"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Ліва частина */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Чому обирають нас
          </h2>

          {/* Карточки */}
          <div className="space-y-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex items-start p-5
                           bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(123.63deg,rgba(255,255,255,0.14)_22.7%,rgba(153,153,153,0.04)_99.25%)]
                           shadow-[4px_4px_13px_rgba(0,0,0,0.21)]
                           backdrop-blur-[22.5px]
                           rounded-[10px]
                           box-border
                           border border-white
                           border-[0px]"
              >
                {card.icon}
                <div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-gray-300 text-sm">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Права частина — квадрат з точок */}
        <div className="relative hidden md:flex justify-center items-center">
          <img
            src="/dotsForWHYUSPage.png" // заміни на свою картинку
            alt="Про нашу компанію"
            className=" mt-10 "
          />
        </div>
      </div>
    </section>
  );
}
