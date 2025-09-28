"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ContactModal from '@/app/components/ContactModal'; // Імпортуйте відповідно до вашої структури файлів
import { useContactModal } from '@/app/hooks/useContactModal'; // Імпортуйте відповідно до вашої структури файлів

// Типи для послуг
interface RepairService {
  id: string;
  title: string;
  shortDescription?: string;
  fullDescription: string[];
  consultationText?: string;
  consultationHref?: string;
}

// Компонент accordion item
const AccordionItem = ({ 
  service, 
  isOpen, 
  onToggle,
  onConsultationClick
}: {
  service: RepairService;
  isOpen: boolean;
  onToggle: () => void;
  onConsultationClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-600 sm:w-80 lg:w-300 ">
      {/* Заголовок - завжди видимий */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-8 text-left hover:bg-gray-800 transition-colors px-4 rounded-lg cursor-pointer"
      >
        <h3 className="text-2xl font-bold text-white pr-8 w-60 lg:w-300">
          {service.title}
        </h3>
        
        {/* Стрілка */}
        <div className={`transform transition-transform duration-200 ${
          isOpen ? 'rotate-225' : 'rotate-45'
        }`}>
          <div className="w-6 h-6 relative">
            <div className="absolute top-1/2 left-1/2 w-4 h-px  transform -translate-x-1/2 -translate-y-1/2"><img src="/arrowdown.png" alt="" /></div>
            <div className={`absolute top-1/2 left-1/2 w-px h-4  transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}></div>
          </div>
        </div>
      </button>

      {/* Контент що розкривається */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-160 opacity-100 pb-8' : 'max-h-0 opacity-0 '
      }`}>
        <div className="px-4">
          {/* Короткий опис (якщо є) */}
          {service.shortDescription && (
            <p className="text-gray-300 text-lg mb-6 font-medium">
              {service.shortDescription}
            </p>
          )}
          
          {/* Повний опис */}
          <div className="space-y-4 mb-8">
            {service.fullDescription.map((paragraph, index) => (
              <p key={index} className="text-gray-300 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Кнопка консультації */}
          {service.consultationText && (
            <div className="flex justify-end">
              <button
                onClick={onConsultationClick}
                className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors cursor-pointer group"
              >
                <span className="mr-4 font-medium">{service.consultationText}</span>
                <div className="flex items-center">
                <div className="w-25"><img src="/arrowleft.png" alt="" /></div>

                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function RepairServices() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { isOpen, openModal, closeModal } = useContactModal();

  const services: RepairService[] = [
    {
      id: 'battery-repair',
      title: 'Ремонт акумуляторів',
      shortDescription: 'Ми виконуємо професійний ремонт акумуляторів будь-якої складності.',
      fullDescription: [
        'Діагностика завжди входить у вартість ремонту, якщо ви вирішете його робити у нас. Якщо ж після діагностики ви відмовляєтеся від ремонту — її вартість складає 550 грн.',
        'Роботи починаються тільки після узгодження ціни з клієнтом, тому ви завжди контролюєте витрати та результат.'
      ],
      consultationText: 'Замовити консультацію'
    },
    {
      id: 'repack-repair',
      title: 'Перепаковка акумуляторів та ремонт для електроінструментів',
      shortDescription: 'Ваш улюблений інструмент перестав тримати заряд?',
      fullDescription: [
        'Ми виконуємо повну перепаковку — замінимо старі елементи на нові у рідному корпусі. Таким чином ви отримаєте повністю відновлений акумулятор, який працює навіть краще за оригінальний, але за значно нижчу ціну, ніж купівля нового інструмента чи батареї.',
        'Роботи починаються тільки після узгодження ціни з клієнтом, тому ви завжди контролюєте витрати та результат.'
      ],
      consultationText: 'Замовити консультацію'
    }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (  
    <>
    <section className="min-h-screen text-white py-16 px-4 snap-star pt-40" id='repair'>
      <img src="/shademain2.png" alt="Моє зображення" className="absolute w-150 z-[-9] ml-[-20] mt-[-100]" />
      <img src="/shademain2.png" alt="Моє зображення" className="absolute w-150 z-[-9] mt-[-250] ml-150 hidden" />

      <div className="max-w-300 mx-auto">
        {/* Заголовок */}
        <h1 className="text-4xl font-bold text-center mb-16">
          Ремонтні послуги
        </h1>

          {/* Accordion */}
          <div className="space-y-4 sm:w-85 lg:w-300 ">
            {services.map((service) => (
              <AccordionItem
                key={service.id}
                service={service}
                isOpen={openItems.includes(service.id)}
                onToggle={() => toggleItem(service.id)}
                onConsultationClick={openModal}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Модальне вікно */}
      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}