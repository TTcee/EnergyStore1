'use client';

import React from "react";
import ContactModal from '@/app/components/ContactModal';
import { useContactModal } from '@/app/hooks/useContactModal';

const Product5Page = () => {
  const { isOpen, openModal, closeModal } = useContactModal();

  return (
    <>
      <div className="min-h-screen relative py-10">
        {/* Фони */}
        <img 
          src="/shademain2.png" 
          alt="" 
          className="absolute lg:mt-[-850px] z-[-10] bg-center bg-cover lg:ml-[-600px] mt-[-200px] ml-[-100px]" 
        />
        <img 
          src="/shademain2.png" 
          alt="" 
          className="absolute lg:mt-[-700px] z-[-10] bg-center bg-cover lg:ml-[300px] mt-40 lg:w-[300px] w-[400px] ml-60" 
        />

        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* LEFT block */}
            <div className="flex justify-center lg:justify-start">
              <div 
                className="bg-[linear-gradient(123.59deg,rgba(126,151,205,0.12)_2.68%,rgba(11,85,181,0.042)_101.21%)]
                  backdrop-blur-[38.5px] rounded-[20px] border border-gray-700 p-8 max-w-full lg:h-[500px] h-[350px] w-full"
              >
                                                                      <div className=" "><img src="/SES.png" alt="" className="lg:mt-17 md:mx-auto md:my-auto md:w-sm "/></div>

              </div>
            </div>

            {/* RIGHT block */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Індивідуальний<br/>акамулятор
              </h1>

              <p className="text-gray-300 text-[14px] lg:text-sm leading-relaxed">
                Ми виготовляємо акумулятори будь-якої форми, розміру та ємності — повністю під ваші задачі. <br/>
                <br/>Ви обираєте необхідну потужність та конфігурацію, а ми підбираємо оптимальні елементи.
              </p>

              <p className="text-gray-300 text-[14px] lg:text-sm leading-relaxed">
                Це ідеальне рішення для нестандартних проєктів, де звичайні батареї не підходять. Вартість обговорюється індивідуально.
              </p>

              {/* Інформаційний блок */}
              <div 
                className="border border-[#15D54E] rounded-[10px] p-4 backdrop-blur-sm"
                style={{
                  background:
                    "linear-gradient(188.75deg, #15D54E -113.09%, rgba(49,49,49,0.5) 243.84%)",
                }}
              >
                <p className="text-sm leading-relaxed">
                  Вартість цього товару починається від <span className="font-semibold text-white">2100 грн</span>.<br/>
                  Точна ціна визначається індивідуально відповідно до ваших потреб.<br/>
                  Для уточнення звертайтесь на <span className="font-semibold text-white">консультацію</span>.
                </p>
              </div>

              {/* Кнопка */}
              <button
                onClick={openModal}
                className="relative w-full md:w-full lg:w-full overflow-hidden bg-[linear-gradient(178.22deg,#2147E0_-26.59%,#000000_172.7%)]
                  rounded-[10px] text-white font-semibold px-8 py-4 text-[13px] leading-[19px]
                  tracking-[0.02em] border border-white/20 transition-transform duration-300 ease-in-out
                  transform hover:scale-105 group cursor-pointer"
              >
                <span className="relative z-10">Зв'язатись з нами</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default Product5Page;
