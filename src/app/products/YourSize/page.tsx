import React from "react";

const Product2Page = () => {
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
            Акумулятор під ваші<br/>розміри
          </h1>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            Ми виготовляємо акумулятори індивідуально під потреби<br/>
            клієнта у зручній термоусадці, що надійно захищає елементи<br/>
            й забезпечує компактність.
          </p>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            За бажанням можемо використати додаткове покриття для<br/>
            кращої ізоляції та довговічності. Це рішення підходить тим,<br/>
            хто хоче отримати готовий до використання акумулятор.
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

export default Product2Page;