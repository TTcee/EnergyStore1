'use client';

import React from 'react';
import ContactModal from '@/app/components/ContactModal'; // Імпортуйте відповідно до вашої структури файлів
import { useContactModal } from '@/app/hooks/useContactModal'; // Імпортуйте відповідно до вашої структури файлів

export default function MainPage() {
  const { isOpen, openModal, closeModal } = useContactModal();

  return (
    <>
      <section id="hero" className="min-h-screen flex  text-white">
        <img src="/shademain.png" alt="Моє зображення" className="absolute w-200 z-[-10] mt-[-100]" />
        <img src="/shademain2.png" alt="Моє зображення" className="absolute w-150 z-[-9] mt-45 " />
          <div className="max-w-8xl  ml-4 flex  sm:ml-8 md:ml-16 lg:ml-41">
         <div>
           <h1 className="font-['Rubik_Mono_One'] font-normal  leading-16
               bg-[linear-gradient(90.01deg,#F6F6F6_0.01%,#909090_206.48%)] 
               bg-clip-text text-transparent text-4xl text-4xl sm:text-6xl font-extrabold mb-6 mt-30">
            ВИРОБНИЦТВО <br /> СУЧАСНИХ АКУМУЛЯТОРІВ
          </h1>
          <p className="  sm:text-lg mb-10 font-montserrat font-normal text-[10px] leading-[20px] text-[#EEEEEE]">
            Ми дбаємо про те, щоб ваша техніка ніколи не залишалася без живлення.
            Від ремонту до виробництва — надійна енергія у кожному рішенні.
          </p>
          <div className="flex flex-col sm:flex-row  gap-4">
            <button
              onClick={openModal}
              className="w-70 h-[57.54px] 
              bg-[linear-gradient(89.61deg,#002A96_-54.17%,#A06BEB_166.48%)] 
              shadow-[0px_4px_12px_rgba(0,0,0,0.45),_-4px_-3px_11px_rgba(93,55,245,0.42)]
              text-white rounded-lg
              transition duration-300 ease-in-out
              hover:shadow-[0px_0px_25px_rgba(160,107,235,0.9),0px_0px_45px_rgba(0,42,150,0.7)] hover:scale-105 font-montserrat font-bold text-[14px] leading-[20px] text-center text-[#F6F6F6]
            "
            >
              Отримати <br /> консультацію
            </button>
           <button
              className="
                w-70 h-[57.54px]
                bg-transparent
                border-2 border-white
                text-white
                rounded-lg
                shadow-[0px_4px_12px_rgba(255,255,255,0.2),_-4px_-3px_11px_rgba(255,255,255,0.2)]
                transition duration-300 ease-in-out
                hover:shadow-[0px_0px_25px_rgba(255,255,255,0.9),0px_0px_45px_rgba(255,255,255,0.7)]
                hover:scale-105
                font-montserrat font-bold text-[14px] leading-[20px] text-center
              "
            >
              Список товарів
            </button>
          </div>
          </div> 
          <div>      
            <img src="/HailongMain.png" alt="Моє зображення" className="sm:block hidden md:block hidden mt-[-90]" />
          </div>
        </div>
      </section>
      
      {/* Модальне вікно */}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}