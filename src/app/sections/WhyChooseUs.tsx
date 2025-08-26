import { Clock, Award, Settings, Shield } from "lucide-react"; 

export default function WhyChooseUs() {
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
            <div className="flex items-start p-5 bg-gray-800 rounded-xl shadow-md">
              <Clock className="w-8 h-8 text-yellow-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Досвід понад 13 років</h3>
                <p className="text-gray-300 text-sm">
                  Маємо понад 13 років досвіду у виробництві та ремонті
                  акумуляторів, тому гарантуємо якість і надійність у кожному
                  рішенні.
                </p>
              </div>
            </div>

            <div className="flex items-start p-5 bg-gray-800 rounded-xl shadow-md">
              <Award className="w-8 h-8 text-yellow-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Надійність та довговічність</h3>
                <p className="text-gray-300 text-sm">
                  Застосовуємо перевірені літієві елементи та сучасне складання,
                  щоб батареї працювали стабільно й витримували складні умови.
                </p>
              </div>
            </div>

            <div className="flex items-start p-5 bg-gray-800 rounded-xl shadow-md">
              <Settings className="w-8 h-8 text-yellow-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Індивідуальні рішення</h3>
                <p className="text-gray-300 text-sm">
                  Розробляємо акумулятори з потрібною ємністю та системою
                  управління живленням під конкретні задачі клієнта.
                </p>
              </div>
            </div>

            <div className="flex items-start p-5 bg-gray-800 rounded-xl shadow-md">
              <Shield className="w-8 h-8 text-yellow-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Безпека понад усе</h3>
                <p className="text-gray-300 text-sm">
                  Наші батареї мають захист від перегріву та перевантаження, що
                  гарантує максимальну безпеку під час використання.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Права частина — квадрат з точок */}
        <div className="relative hidden md:flex justify-center items-center">
          <div className="mt-17 grid grid-cols-36 gap-3">
            {Array.from({ length: 1116 }).map((_, i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-gray-500 opacity-70"
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
