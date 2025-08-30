export default function AboutUs() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center text-white px-6 py-16 snap-start pt-20"
    >
            <img src="/shademain2.png" alt="Моє зображення" className="absolute w-250 z-[-9] mt-[-100] ml-[-900]" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Ліва колонка (картинка + точки) */}
        <div className="relative order-1 lg:order-none w-full flex justify-center lg:justify-start">
          <div className="relative w-4/5 sm:w-3/5 lg:w-full">
            <img
              src="/example.png" // заміни на свою картинку
              alt="Про нашу компанію"
              className="rounded-lg shadow-lg w-full h-auto"
            />
            {/* декоративні точки */}
           <img
             src="/dotsForSecPage.png"
             alt="Декоративні точки"
             className="absolute z-[-10] ml-1 top-10 sm:top-12 md:top-18 lg:top-20
             left-[-30] sm:left-[-30] md:left-[-42] lg:left-[-48] w-full h-full object-contain"
              />
          </div>
        </div>

        {/* Права колонка (текст) */}
        <div className="order-0 lg:order-none space-y-6">
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
