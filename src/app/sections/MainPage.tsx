export default function MainPage() {
  return (
    <section id="hero" className="min-h-screen flex  text-white">
        <div className="max-w-3xl mt-41 ml-41">
        <h1 className="font-rubik text-4xl text-4xl sm:text-6xl font-extrabold mb-6">
          ВИРОБНИЦТВО <br /> СУЧАСНИХ АКУМУЛЯТОРІВ
        </h1>
        <p className="font-montserratAlt text-lg  sm:text-xl mb-10 text-gray-300">
          Ми дбаємо про те, щоб ваша техніка ніколи не залишалася без живлення.
          Від ремонту до виробництва — надійна енергія у кожному рішенні.
        </p>
        <div className="flex flex-col sm:flex-row  gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-6 py-3 rounded-lg font-semibold">
            Отримати консультацію
          </button>
          <button className="border border-gray-400 hover:border-white transition-colors text-white px-6 py-3 rounded-lg font-semibold">
            Список товарів
          </button>
        </div>
      </div>
    </section>
  );
}
