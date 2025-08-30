'use client';

import React from "react";
import ContactModal from '@/app/components/ContactModal'; // Імпортуйте відповідно до вашої структури файлів
import { useContactModal } from '@/app/hooks/useContactModal'; // Імпортуйте відповідно до вашої структури файлів

const Product4Page = () => {
  const { isOpen, openModal, closeModal } = useContactModal();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="mt-[-20] max-w-7xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* Ліва частина - placeholder для зображення */}
          <div className="flex justify-center">
            <div className="bg-[linear-gradient(123.59deg,rgba(126,151,205,0.12)_2.68%,rgba(11,85,181,0.042)_101.21%)]
            backdrop-blur-[38.5px] rounded-[20px] border border-gray-700 rounded-2xl p-8 max-w-300 lg:h-130 h-100 w-full"></div>
          </div>

          {/* Права частина - текст */}
          <div className="text-white space-y-4 lg:ml-10 ml-0 lg:w-130 w-110">
            <h1 className="text-5xl font-bold text-white mb-6">
              Комплектація велосипеда<br/>з кейсом в рамі
            </h1>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Ми створюємо акумулятори у спеціально виготовлених коробках, що точно відповідають розмірам вашої рами. 
            </p>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              За бажанням можемо інтегрувати контролер. Це дозволяє отримати акуратний вигляд без зайвих дротів і кріплень та ефективно використати простір велосипеда. Індивідуальне рішення для надійності й зручності.
            </p>
            
            {/* Інформаційний блок */}
            <div className="border border-[#15D54E] rounded-[10px] rounded-xl p-4 backdrop-blur-sm" style={{
    background: "linear-gradient(188.75deg, #15D54E -113.09%, rgba(49,49,49,0.5) 243.84%)",
  }}>
              <p className="text-xs leading-relaxed">
                Вартість цього товару починається від <span className="font-semibold text-white">3600 грн</span>.<br/>
                Точна ціна визначається індивідуально відповідно до<br/>
                ваших потреб. Для уточнення звертайтесь на <span className="font-semibold text-white">консультацію</span>.
              </p>
            </div>
            
            {/* Кнопка */}
            <button
  className="w-full relative overflow-hidden bg-[linear-gradient(178.22deg,#2147E0_-26.59%,#000000_172.7%)]
             rounded-[10px] text-white font-semibold px-8 py-4
             text-[13px] leading-[19px] tracking-[0.02em]  border border-white/20
             transition-transform duration-300 ease-in-out transform hover:scale-105 group cursor-pointer"
  onClick={openModal}
>
  <span className="relative z-10">Зв'язатись з нами</span>

  {/* Перелив */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
  </div>
</button>
          </div>
        </div>
      </div>
      
      {/* Модальне вікно */}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default Product4Page;