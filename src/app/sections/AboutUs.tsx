export default function AboutUs() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center from-gray-900 to-gray-800 text-white px-6 py-16"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Ліва колонка (картинка) */}
        <div className="relative">
          <img
            src="/about-us.jpg" // заміни на свою картинку
            alt="Про нашу компанію"
            className="rounded-lg shadow-lg w-full h-auto"
          />
          {/* декоративні точки */}
          <div className="absolute -bottom-6 -left-6 w-40 h-40 hidden md:block">
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 64 }).map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-gray-500"></span>
              ))}
            </div>
          </div>
        </div>

        {/* Права колонка (текст) */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Про нашу компанію
          </h2>
          <hr className="border-gray-500 w-2/3" />

          <p className="leading-relaxed text-gray-300">
            Energy Store вже понад десять років спеціалізується на виробництві та ремонті акумуляторів для електротранспорту.
          </p>

          <p className="leading-relaxed text-gray-300">
            Ми створюємо надійні та довговічні батареї для електровелосипедів, самокатів, гіробордів та інших сучасних засобів пересування, використовуючи якісні літієві елементи та сучасні технології складання.
          </p>

          <p className="leading-relaxed text-gray-300">
            Наш досвід дозволяє розробляти рішення з високою ємністю, ефективною системою управління живленням та захистом від перегріву, щоб забезпечити максимальну безпеку та комфорт під час використання.
          </p>
        </div>
      </div>
    </section>
  );
}
