'use client';

import React, { useState } from 'react';
import { X, Phone, MessageCircle, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'choose' | 'callback' | 'messengers' | 'success' | 'error'>('choose');
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = { name: '', phone: '' };
    let isValid = true;

    // Валідація імені: мінімум 2 символи, тільки літери, дефіси та апострофи
    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄ'\-\s]{2,50}$/;
    if (!formData.name.trim()) {
      newErrors.name = 'Введіть ваше ім\'я';
      isValid = false;
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = 'Ім\'я має містити тільки літери (2-50 символів)';
      isValid = false;
    }

    // Валідація телефону: український формат
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim()
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Дані успішно відправлено:', result);
        setStep('success');
        
        // Автоматично закрити модалку через 3 секунди
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        console.error('Помилка відправки:', result.error);
        setApiError(result.error || 'Сталася помилка при відправці даних');
        setStep('error');
      }
    } catch (error) {
      console.error('Помилка мережі:', error);
      setApiError('Помилка з\'єднання. Перевірте інтернет-з\'єднання.');
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
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTelegramClick = () => {
    // Замініть на ваш реальний Telegram username
    window.open('https://t.me/energy_storee', '_blank');
  };

  const handleViberClick = () => {
    // Замініть на ваш реальний Viber номер
    window.open('viber://chat?number=+380981741488', '_blank');
  };

  const handleRetry = () => {
    setStep('callback');
    setApiError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 
    bg-[linear-gradient(110.99deg,rgba(255,255,255,0.08)_-24.09%,rgba(115,115,115,0.04)_118.13%)] 
    backdrop-blur-[9px] rounded-[6px] pl-10 pt-15 pr-10
    flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md mx-auto relative animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Кнопка закриття */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          disabled={isSubmitting}
        >
          <X size={24} />
        </button>

        <div className="p-4 sm:p-6">
          {/* Крок вибору способу комунікації */}
          {step === 'choose' && (
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Зв'яжіться з нами
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                Оберіть зручний для вас спосіб комунікації
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setStep('callback')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                  <Phone size={20} />
                  Замовити зворотний дзвінок
                </button>
                
                <button
                  onClick={() => setStep('messengers')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                  <MessageCircle size={20} />
                  Написати в месенджер
                </button>
              </div>
            </div>
          )}

          {/* Крок форми зворотного дзвінка */}
          {step === 'callback' && (
            <div>
              <button
                onClick={() => setStep('choose')}
                className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
                disabled={isSubmitting}
              >
                ← Назад
              </button>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Зворотний дзвінок
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Залиште ваші контактні дані, і ми зв'яжемося з вами
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше ім'я *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Введіть ваше ім'я"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Номер телефону *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+380XX XXX XX XX"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Відправляємо...
                    </>
                  ) : (
                    'Замовити дзвінок'
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Крок вибору месенджера */}
          {step === 'messengers' && (
            <div>
              <button
                onClick={() => setStep('choose')}
                className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
              >
                ← Назад
              </button>
              
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Оберіть месенджер
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                Напишіть нашому менеджеру у зручному для вас месенджері
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleTelegramClick}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Написати в Telegram
                </button>
                
                <button
                  onClick={handleViberClick}
                  className="w-full pl-5 bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                  <img className='rounded-xl' src="/viber.png" alt="" />
                  Написати в Viber
                </button>
              </div>
            </div>
          )}

          {/* Крок успішної відправки */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Дякуємо!
              </h2>
              <p className="text-gray-600">
                Очікуйте зворотнього зв'язку.<br />
                Ми зв'яжемося з вами найближчим часом.
              </p>
            </div>
          )}

          {/* Крок помилки */}
          {step === 'error' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Упс! Щось пішло не так
              </h2>
              <p className="text-gray-600 mb-4">
                {apiError || 'Не вдалося відправити дані. Спробуйте ще раз.'}
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

export default ContactModal;