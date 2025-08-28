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

  // Доступні напруги після вибору моделі
  const availableVoltages = selectedModel
    ? Array.from(
        new Set(
          configurations
            .filter(c => c.model === selectedModel)
            .map(c => c.voltage)
        )
      )
    : [];

  // Доступні ємності після вибору моделі та напруги
  const availableCapacities = selectedModel && selectedVoltage
    ? configurations
        .filter(c => c.model === selectedModel && c.voltage === selectedVoltage)
        .map(c => c.capacity)
    : [];

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

  const SelectDropdown = ({
    label,
    value,
    options,
    onChange,
    placeholder
  }: {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder: string;
  }) => (
    <div className="flex flex-col">
      <label className="text-white text-sm mb-2 font-medium">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer hover:border-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
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
    <div className="min-h-screen py-16 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center lg:justify-start">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full">
              <div className="aspect-square flex items-center justify-center">
                <div className="w-80 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-24 bg-gray-600 rounded-lg mx-auto mb-4"></div>
                    <p className="text-gray-400 text-sm">Hailong Battery Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-6">Hailong</h1>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Акумулятор у корпусі Hailong — зручне й надійне рішення для ваших 
                  електровелосипедів. Він кріпиться до рами, легко знімається має захист 
                  від вологи та ударів, замок і індикатор заряду.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectDropdown
                  label="Хімія"
                  value={selectedModel}
                  options={models.map(m => m.value)}
                  onChange={(val) => {
                    setSelectedModel(val);
                    setSelectedVoltage("");
                    setSelectedCapacity("");
                  }}
                  placeholder="..."
                />
                
                <SelectDropdown
                  label="В"
                  value={selectedVoltage}
                  options={availableVoltages}
                  onChange={(val) => {
                    setSelectedVoltage(val);
                    setSelectedCapacity("");
                  }}
                  placeholder="..."
                />
                
                <SelectDropdown
                  label="Аг"
                  value={selectedCapacity}
                  options={availableCapacities}
                  onChange={setSelectedCapacity}
                  placeholder="..."
                />
              </div>

              {currentHailong && (
                <p className="text-gray-400 text-sm mt-1">{currentHailong}</p>
              )}

              <div className="flex items-center justify-between pt-6">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
                  onClick={() => setIsProductModalOpen(true)}
                >
                  Зв'язатись з нами
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