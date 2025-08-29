'use client';

import React from "react";
import ContactModal from '@/app/components/ContactModal'; // Імпортуйте відповідно до вашої структури файлів
import { useContactModal } from '@/app/hooks/useContactModal'; // Імпортуйте відповідно до вашої структури файлів

const Product3Page = () => {
  const { isOpen, openModal, closeModal } = useContactModal();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="mt-[-20] max-w-7xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* Ліва частина - placeholder для зображення */}
          <div className="flex justify-center">
            <div className="bg-[linear-gradient(123.59deg,rgba(126,151,205,0.12)_2.68%,rgba(11,85,181,0.042)_101.21%)]
            backdrop-blur-[38.5px] rounded-[20px] border border-gray-700 rounded-2xl p-8 max-w-300 h-130 w-full"></div>
          </div>

          {/* Права частина - текст */}
          <div className="text-white space-y-4">
            <h1 className="text-5xl font-bold text-white mb-6">
              Акамулятор з Ваших<br/>елементів
            </h1>
            
            <p className="text-gray-300 text-sm leading-relaxed">
            У вас є елементи, але немає досвіду чи інструментів для збирання батареї? 
            Надішліть їх нам! Ми виготовимо акумулятор будь-якої конфігурації з ваших осередків, використовуючи професійне обладнання. 
            </p>
            
            <p className="text-gray-300 text-sm leading-relaxed">
            Ви оплачуєте лише роботу та матеріали, що дозволяє суттєво зекономити бюджет.
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

export default Product3Page;