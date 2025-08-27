'use client';

import React, { useState } from 'react';
import { X, Phone, MessageCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'choose' | 'callback' | 'messengers' | 'success'>('choose');
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: ''
  });

  const validateForm = () => {
    const newErrors = { name: '', phone: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Введіть ваше ім\'я';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Ім\'я має містити мінімум 2 символи';
      isValid = false;
    }

    const phoneRegex = /^(\+380|380|0)[0-9]{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введіть номер телефону';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Введіть коректний номер телефону';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Тут буде логіка відправки даних
      console.log('Дані для відправки:', formData);
      setStep('success');
      
      // Автоматично закрити модалку через 3 секунди
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  const handleClose = () => {
    setStep('choose');
    setFormData({ name: '', phone: '' });
    setErrors({ name: '', phone: '' });
    onClose();
  };

  const handleInputChange = (field: 'name' | 'phone', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/energy_storee', '_blank');
  };

  const handleViberClick = () => {
    window.open('viber://chat?number=+380981741488', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md mx-auto relative animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Кнопка закриття */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          {/* Крок вибору способу комунікації */}
          {step === 'choose' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Зв'яжіться з нами
              </h2>
              <p className="text-gray-600 mb-8">
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
              >
                ← Назад
              </button>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Зворотний дзвінок
              </h2>
              <p className="text-gray-600 mb-6">
                Залfollow ваші контактні дані, і ми зв'яжемося з вами
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Введіть ваше ім'я"
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+380XX XXX XX XX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                >
                  Замовити дзвінок
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
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Оберіть месенджер
              </h2>
              <p className="text-gray-600 mb-8">
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
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 3.11-.13 8.95 5.5 10.541v2.42s-.038.97.602.582c.64-.388 2.88-2.321 2.88-2.321 0 0 .46.063.46.063 3.95.375 6.729-.4 7.061-3.487.4-3.317.181-5.685-1.421-7.19C13.331 8.161 11.058 7.976 11.398.002zM12.016 2.054c4.023-.262 6.705 1.385 7.451 5.188 1.004 4.407-.4 6.109-1.594 6.929-.381.262-.381.4-.381.4s-.346-.413-1.092-.826c-.346-.194-.329-.065-.631-.216 1.393-1.46 1.685-3.26.619-5.149-.96-1.698-2.918-2.618-4.756-2.618-.329 0-.658.043-.986.129-.164-.048-.329-.1-.494-.151-.164-.048-.328-.095-.493-.14-.164-.046-.329-.091-.494-.135-.164-.044-.328-.087-.493-.13-.164-.042-.329-.084-.493-.125-.164-.04-.328-.08-.493-.119-.164-.038-.328-.076-.493-.114-.164-.037-.329-.073-.493-.109-.164-.035-.328-.07-.493-.104-.164-.033-.328-.066-.493-.098-.164-.031-.329-.062-.493-.092-.164-.029-.328-.058-.493-.086-.164-.027-.329-.054-.493-.08-.165-.025-.329-.05-.494-.074-.164-.023-.329-.046-.493-.068-.164-.021-.329-.042-.493-.062-.164-.019-.329-.038-.493-.056-.164-.017-.329-.034-.493-.05-.164-.015-.329-.03-.493-.044-.164-.013-.329-.026-.493-.038-.164-.011-.329-.022-.493-.032-.164-.009-.329-.018-.493-.026-.164-.007-.329-.014-.493-.02-.164-.005-.329-.01-.493-.014-.164-.003-.329-.006-.493-.008-.164-.001-.329-.002-.494-.002z"/>
                  </svg>
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
        </div>
      </div>
    </div>
  );
};

export default ContactModal;