'use client';

import React, { useState } from 'react';
import { X, ShoppingCart, MessageCircle, Loader2 } from 'lucide-react';

interface HailongProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  selectedVoltage: string;
  selectedCapacity: string;
  currentHailong: string;
  currentPrice: number;
  onOpenConsultation: () => void;
}

const HailongProductModal: React.FC<HailongProductModalProps> = ({
  isOpen,
  onClose,
  selectedModel,
  selectedVoltage,
  selectedCapacity,
  currentHailong,
  currentPrice,
  onOpenConsultation,
}) => {
  const [step, setStep] = useState<'choose' | 'purchase' | 'success' | 'error'>('choose');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = { name: '', phone: '' };
    let isValid = true;

    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄ'\-\s]{2,50}$/;
    if (!formData.name.trim()) {
      newErrors.name = "Введіть ваше ім'я";
      isValid = false;
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = "Ім'я має містити тільки літери (2-50 символів)";
      isValid = false;
    }

    const phoneRegex = /^(\+?38)?[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введіть номер телефону';
      isValid = false;
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Введіть коректний український номер';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePurchaseSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await fetch('/api/sendPurchaseMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          productDetails: {
            model: selectedModel,
            voltage: selectedVoltage,
            capacity: selectedCapacity,
            hailong: currentHailong,
            price: currentPrice,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStep('success');
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setApiError(result.error || 'Сталася помилка при відправці даних');
        setStep('error');
      }
    } catch (error) {
      console.error('Помилка мережі:', error);
      setApiError("Помилка з'єднання. Перевірте інтернет-з'єднання.");
      setStep('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('choose');
    setFormData({ name: '', phone: '' });
    setErrors({ name: '', phone: '' });
    setApiError('');
    onClose();
  };

  const handleInputChange = (field: 'name' | 'phone', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleConsultationClick = () => {
    handleClose();
    onOpenConsultation();
  };

  const handleRetry = () => {
    setStep('purchase');
    setApiError('');
  };

  if (!isOpen) return null;

  const isProductSelected = selectedModel && selectedVoltage && selectedCapacity;

  return (
    <div className="fixed inset-0 
    bg-[linear-gradient(110.99deg,rgba(255,255,255,0.08)_-24.09%,rgba(115,115,115,0.04)_118.13%)] 
    backdrop-blur-[9px] rounded-[6px] pl-10 pt-15 pr-10
    flex items-center justify-center z-50 p-4">
      <div className="bg-[#242424] rounded-2xl w-full max-w-md mx-auto relative animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Кнопка закриття */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          disabled={isSubmitting}
        >
          <X size={24} />
        </button>

        <div className="p-4 sm:p-6">
          {/* Крок вибору */}
          {step === 'choose' && (
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Hailong акумулятор</h2>

              {isProductSelected ? (
                <div className="bg-gray-500 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-white mb-2">Обрана конфігурація:</h3>
                  <div className="text-sm text-white space-y-1">
                    <p>
                      <span className="font-medium">Хімія:</span> {selectedModel}
                    </p>
                    <p>
                      <span className="font-medium">Напруга:</span> {selectedVoltage}
                    </p>
                    <p>
                      <span className="font-medium">Ємність:</span> {selectedCapacity}
                    </p>
                    <p>
                      <span className="font-medium">Модель:</span> {currentHailong}
                    </p>
                    <p className="text-lg font-bold text-green-400 mt-2">{currentPrice} ₴</p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-500 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-white text-sm">
                    Будь ласка, оберіть всі характеристики акумулятора перед продовженням
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => setStep('purchase')}
                  disabled={!isProductSelected}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={20} />
                  Купити зараз
                </button>

                <button
                  onClick={handleConsultationClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                  <MessageCircle size={20} />
                  Замовити консультацію
                </button>
              </div>
            </div>
          )}

          {/* Крок оформлення покупки */}
          {step === 'purchase' && (
            <div>
              <button
                onClick={() => setStep('choose')}
                className="text-white hover:text-blue-700 mb-4 flex items-center gap-2"
                disabled={isSubmitting}
              >
                ← Назад
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Оформлення замовлення</h2>

              <div className="bg-gray-500 rounded-lg p-3 mb-4">
                <div className="text-sm text-white">
                  <p>
                    <span className="font-medium">Товар:</span> {selectedModel} {selectedVoltage}{' '}
                    {selectedCapacity} ({currentHailong})
                  </p>
                  <p className="font-bold text-green-400">{currentPrice} ₴</p>
                </div>
              </div>

              <p className="text-white mb-6 text-sm sm:text-base">
                Залиште ваші контактні дані для оформлення замовлення
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Ваше ім'я *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Введіть ваше ім'я"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Номер телефону *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+380XX XXX XX XX"
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <button
                  onClick={handlePurchaseSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Відправляємо...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Оформити замовлення
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Крок успіху */}
{step === 'success' && (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold !text-white mb-2">Замовлення прийнято!</h2>
    <p className="text-white">
      Дякуємо за замовлення!
      <br />
      Наш менеджер зв'яжеться з вами для підтвердження.
    </p>
  </div>
)}

{/* Крок помилки */}
{step === 'error' && (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg
        className="w-8 h-8 text-red-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-white mb-2" >Упс! Щось пішло не так</h2>
    <p className="text-white mb-4">
      {apiError || 'Не вдалося відправити замовлення. Спробуйте ще раз.'}
    </p>
    <button
      onClick={handleRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition-colors"
    >
      Спробувати ще раз
    </button>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default HailongProductModal;
