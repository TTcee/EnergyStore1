"use client";

import React, { useState, useEffect } from "react";
import HailongProductModal from "@/app/components/HailongProductModal"; // Імпортуйте компоненту
import ContactModal from "@/app/components/ContactModal"; // Імпортуйте існуючу компоненту

interface Option {
  id: string;
  label: string;
  value: string;
}

interface Configuration {
  hailong: string;
  model: string;
  voltage: string;
  capacity: string;
  price: number;
}

// Повний список конфігурацій
const configurations: Configuration[] = [
  // Lion
  { model: "Lion", hailong: "Hailong 65", voltage: "36V", capacity: "10Ah", price: 1000 },
  { model: "Lion", hailong: "Hailong 65", voltage: "36V", capacity: "15Ah", price: 1200 },
  { model: "Lion", hailong: "Hailong 65", voltage: "36V", capacity: "20Ah", price: 1400 },
  { model: "Lion", hailong: "Hailong 65", voltage: "48V", capacity: "10Ah", price: 1300 },
  { model: "Lion", hailong: "Hailong 65", voltage: "48V", capacity: "15Ah", price: 1500 },
  { model: "Lion", hailong: "Hailong 65", voltage: "48V", capacity: "20Ah", price: 1700 },

  { model: "Lion", hailong: "Hailong 80", voltage: "36V", capacity: "25Ah", price: 1800 },
  { model: "Lion", hailong: "Hailong 80", voltage: "36V", capacity: "30Ah", price: 2000 },
  { model: "Lion", hailong: "Hailong 80", voltage: "48V", capacity: "25Ah", price: 2200 },

  // LiFePo4
  { model: "LiFePo4", hailong: "Hailong 65", voltage: "36V", capacity: "6Ah", price: 1100 },
  { model: "LiFePo4", hailong: "Hailong 80", voltage: "36V", capacity: "12Ah", price: 900 },
];

const Product1Page = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedVoltage, setSelectedVoltage] = useState<string>("");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<number>(1200);
  
  // Стани для модальних вікон
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  const models: Option[] = [
    { id: "lion", label: "Lion", value: "Lion" },
    { id: "lifepo4", label: "LiFePo4", value: "LiFePo4" },
  ];

  // Функція для перевірки сумісності
  const isOptionCompatible = (type: 'model' | 'voltage' | 'capacity', value: string): boolean => {
    if (type === 'model') {
      return configurations.some(c => 
        c.model === value &&
        (!selectedVoltage || c.voltage === selectedVoltage) &&
        (!selectedCapacity || c.capacity === selectedCapacity)
      );
    } else if (type === 'voltage') {
      return configurations.some(c => 
        c.voltage === value &&
        (!selectedModel || c.model === selectedModel) &&
        (!selectedCapacity || c.capacity === selectedCapacity)
      );
    } else { // capacity
      return configurations.some(c => 
        c.capacity === value &&
        (!selectedModel || c.model === selectedModel) &&
        (!selectedVoltage || c.voltage === selectedVoltage)
      );
    }
  };

  // Всі доступні моделі
  const allModels = models.map(m => m.value);

  // Всі доступні напруги
  const allVoltages = Array.from(
    new Set(configurations.map(c => c.voltage))
  );

  // Всі доступні ємності
  const allCapacities = Array.from(
    new Set(configurations.map(c => c.capacity))
  );

  // Поточний Hailong
  const currentHailong = selectedModel && selectedVoltage && selectedCapacity
    ? configurations.find(
        c =>
          c.model === selectedModel &&
          c.voltage === selectedVoltage &&
          c.capacity === selectedCapacity
      )?.hailong || ""
    : "";

  // Обчислення ціни
  useEffect(() => {
    if (selectedModel && selectedVoltage && selectedCapacity) {
      const config = configurations.find(
        c => c.model === selectedModel &&
             c.voltage === selectedVoltage &&
             c.capacity === selectedCapacity
      );
      if (config) {
        setCurrentPrice(config.price);
      }
    }
  }, [selectedModel, selectedVoltage, selectedCapacity]);

  // Функції зміни параметрів
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    
    // Перевіряємо сумісність поточних параметрів з новою моделлю
    if (selectedVoltage && !configurations.some(c => c.model === value && c.voltage === selectedVoltage)) {
      setSelectedVoltage("");
    }
    if (selectedCapacity && !configurations.some(c => c.model === value && c.capacity === selectedCapacity)) {
      setSelectedCapacity("");
    }
  };

  const handleVoltageChange = (value: string) => {
    setSelectedVoltage(value);
    
    // Перевіряємо сумісність поточних параметрів з новою напругою
    if (selectedModel && !configurations.some(c => c.voltage === value && c.model === selectedModel)) {
      setSelectedModel("");
    }
    if (selectedCapacity && !configurations.some(c => c.voltage === value && c.capacity === selectedCapacity)) {
      setSelectedCapacity("");
    }
  };

  const handleCapacityChange = (value: string) => {
    setSelectedCapacity(value);
    
    // Перевіряємо сумісність поточних параметрів з новою ємністю
    if (selectedModel && !configurations.some(c => c.capacity === value && c.model === selectedModel)) {
      setSelectedModel("");
    }
    if (selectedVoltage && !configurations.some(c => c.capacity === value && c.voltage === selectedVoltage)) {
      setSelectedVoltage("");
    }
  };

  const SmartSelectDropdown = ({
    label,
    value,
    options,
    onChange,
    placeholder,
    type
  }: {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder: string;
    type: 'model' | 'voltage' | 'capacity';
  }) => (
    <div className="flex flex-col">
      <label className="text-white text-sm mb-2 font-medium">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[linear-gradient(123.59deg,rgba(126,151,205,0.12)_2.68%,rgba(11,85,181,0.042)_101.21%)]
            backdrop-blur-[38.5px] rounded-[20px] border border-gray-600 rounded-lg px-4 py-3 text-gray appearance-none cursor-pointer hover:border-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((val) => {
            const isCompatible = isOptionCompatible(type, val);
            return (
              <option 
                key={val} 
                value={val}
                className={`w-full rounded-xl px-4 py-3 border border-blue-500 focus:border-blue-500 outline-none ${
                  isCompatible 
                    ? 'bg-black/90 text-white' 
                    : 'bg-red-900/50 text-white'
                }`}
                title={isCompatible ? '' : 'Ця опція не підходить під вибрану конфігурацію'}
              >
                {val}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" py-16">
      <img src="/shademain2.png" alt="" className="absolute lg:mt-[-850] z-[-10]  bg-center bg-cover lg:ml-[-600] mt-[-200] ml-[-100]"/>
      <img src="/shademain2.png" alt="" className="absolute lg:mt-[-700] z-[-10]  bg-center bg-cover lg:ml-[300] mt-70 lg:w-300 w-400 ml-60"/>


      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center lg:justify-start">
            <div className="bg-[linear-gradient(123.59deg,rgba(126,151,205,0.12)_2.68%,rgba(11,85,181,0.042)_101.21%)]
            backdrop-blur-[38.5px] rounded-[20px] border border-gray-700 rounded-2xl p-8 max-w-300 lg:h-130 h-100 w-full">
              <div className="aspect-square ">
                  <div className="text-center">
                    <div className="  mb-4"><img src="/hailong.png" alt="" className="lg:mt-17 lg:ml-0 md:mt-0 md:ml-40 mt-13"/></div>
                  </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6">Hailong</h1>
              <div className="space-y-4 text-gray-300">
                <p className="text-[13px] leading-relaxed">
                  Акумулятор у корпусі Hailong — зручне й надійне рішення для ваших 
                  електровелосипедів. Він кріпиться до рами, легко знімається має захист 
                  від вологи та ударів, замок і індикатор заряду.
                  Зібраний на літієвих елементах 21700, забезпечує високу ємність, 
                  стабільну роботу й довгий термін служби. Формат підходить до
                  більшості рам і поєднує практичність із сучасним дизайном.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SmartSelectDropdown
                  label="Хімія"
                  value={selectedModel}
                  options={allModels}
                  onChange={handleModelChange}
                  placeholder="..."
                  type="model"
                />
                
                <SmartSelectDropdown
                  label="Напруга, В"
                  value={selectedVoltage}
                  options={allVoltages}
                  onChange={handleVoltageChange}
                  placeholder="..."
                  type="voltage"
                />
                
                <SmartSelectDropdown
                  label="Ємність, Аг"
                  value={selectedCapacity}
                  options={allCapacities}
                  onChange={handleCapacityChange}
                  placeholder="..."
                  type="capacity"
                />
              </div>

              {currentHailong && (
                <p className="text-gray-400 text-[16px] text-sm mt-4">Обрана вами модель - {currentHailong}</p>
              )}

              <div className="flex items-center justify-between pt-6 mt-15">
               <button
  className="relative overflow-hidden bg-[linear-gradient(178.22deg,#2147E0_-26.59%,#000000_172.7%)]
             rounded-[10px] text-white font-semibold px-8 py-4
             text-[13px] leading-[19px] tracking-[0.02em] w-xs border border-white/20
             transition-transform duration-300 ease-in-out transform hover:scale-110 group cursor-pointer"
  onClick={() => setIsProductModalOpen(true)}
>
  <span className="relative z-10">Зв'язатись з нами</span>

  {/* Перелив */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
  </div>
</button>

                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">
                    {currentPrice} ₴
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальне вікно для продукту */}
      <HailongProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        selectedModel={selectedModel}
        selectedVoltage={selectedVoltage}
        selectedCapacity={selectedCapacity}
        currentHailong={currentHailong}
        currentPrice={currentPrice}
        onOpenConsultation={() => setIsContactModalOpen(true)}
      />

      {/* Модальне вікно для консультації */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default Product1Page;