import React from "react";

const Product6Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Ліва частина - placeholder для зображення */}
        <div className="flex justify-center">
          <div className="w-80 h-64 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30"></div>
        </div>

        {/* Права частина - текст */}
        <div className="text-white space-y-4">
          <h1 className="text-3xl font-bold">
            Акумулятор для систем збереження енергії
          </h1>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            Ми виготовляємо потужні акумулятори для енергосховищ та автономних систем живлення.
          </p>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            Такі батареї дозволяють накопичувати енергію від сонячних панелей чи інших джерел і забезпечувати стабільну роботу вашого дому або бізнесу навіть під час відключень. 
          </p>
          
          {/* Інформаційний блок */}
          <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs leading-relaxed">
              Вартість цього товару починається від <span className="font-semibold text-white">1200 грн</span>.<br/>
              Точна ціна визначається індивідуально відповідно до<br/>
              ваших потреб. Для уточнення звертайтесь на <span className="font-semibold text-white">консультацію</span>.
            </p>
          </div>
          
          {/* Кнопка */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors text-sm">
            Зв'язатись з нами
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product6Page;