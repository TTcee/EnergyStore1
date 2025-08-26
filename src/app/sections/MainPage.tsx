
export default function MainPage() {
  return (
    <section id="hero" className="min-h-screen flex  text-white">
      <img src="/shademain.png" alt="Моє зображення" className="absolute w-200 z-[-10] mt-[-100]" />
      <img src="/shademain2.png" alt="Моє зображення" className="absolute w-150 z-[-9] mt-45 " />
        <div className="max-w-8xl  ml-4 flex  sm:ml-8 md:ml-16 lg:ml-32">
       <div>
         <h1 className="font-rubik text-4xl text-4xl sm:text-6xl font-extrabold mb-6 mt-30">
          ВИРОБНИЦТВО <br /> СУЧАСНИХ АКУМУЛЯТОРІВ
        </h1>
        <p className="font-montserratAlt text-lg  sm:text-xl mb-10 text-gray-300">
          Ми дбаємо про те, щоб ваша техніка ніколи не залишалася без живлення.
          Від ремонту до виробництва — надійна енергія у кожному рішенні.
        </p>
        <div className="flex flex-col sm:flex-row  gap-4">
          <button className="w-70 h-[57.54px]  bg-[linear-gradient(89.61deg,#002A96_-54.17%,#A06BEB_166.48%)] shadow-[0px_4px_12px_rgba(0,0,0,0.45),_-4px_-3px_11px_rgba(93,55,245,0.42)]
 bg-purple-600 text-white rounded-lg">
            Отримати консультацію
          </button>
          <button className="w-70 border border-gray-400 hover:border-white transition-colors text-white px-6 py-3 rounded-lg font-semibold">
            Список товарів
          </button>
       
        </div>
        </div> 
        <div>      <img src="/HailongMain.png" alt="Моє зображення" className="sm:block hidden md:block hidden mt-[-90]" />
        </div>
      </div>
    </section>
  );
}
