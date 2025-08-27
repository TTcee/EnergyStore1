'use client';

import React from "react";
import ContactModal from '@/app/components/ContactModal'; // Імпортуйте відповідно до вашої структури файлів
import { useContactModal } from '@/app/hooks/useContactModal'; // Імпортуйте відповідно до вашої структури файлів

const Product5Page = () => {
  const { isOpen, openModal, closeModal } = useContactModal();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* Ліва частина - placeholder для зображення */}
          <div className="flex justify-center">
            <div className="w-80 h-64 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30"></div>
          </div>

          {/* Права частина - текст */}
          <div className="text-white space-y-4">
            <h1 className="text-3xl font-bold">
              Індивідуальний<br/>акамулятор
            </h1>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Ми виготовляємо акумулятори будь-якої форми, розміру та ємності — повністю під ваші задачі. <br/>
              <br/>Ви обираєте необхідну потужність та конфігурацію, а ми підбираємо оптимальні елементи. 
             
            </p>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Це ідеальне рішення для нестандартних проєктів, де звичайні батареї не підходять. Вартість обговорюється індивідуально.<br/>
             
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
            <button 
              onClick={openModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors text-sm"
            >
              Зв'язатись з нами
            </button>
          </div>
        </div>
      </div>
      
      {/* Модальне вікно */}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default Product5Page;