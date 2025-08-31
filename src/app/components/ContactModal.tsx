'use client';

import React, { useState } from 'react';
import { X, Phone, MessageCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'choose' | 'callback' | 'messengers' | 'success' | 'error'>('choose');
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
      newErrors.name = 'Імʼя має містити тільки літери (2-50 символів)';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStep('success');
        setTimeout(() => handleClose(), 3000);
      } else {
        setApiError(result.error || 'Сталася помилка при відправці даних');
        setStep('error');
      }
    } catch (error) {
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
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/energy_storee', '_blank');
  };

  const handleViberClick = () => {
    window.open('viber://chat?number=+380981741488', '_blank');
  };

  const handleRetry = () => {
    setStep('callback');
    setApiError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-[#242424] rounded-2xl w-full max-w-md mx-auto relative shadow-xl max-h-[90vh] overflow-y-auto z-51"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>

            <div className="p-4 sm:p-6">
              <AnimatePresence mode="wait">
                {step === 'choose' && (
                  <motion.div
                    key="choose"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="text-center"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Зв'яжіться з нами
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Оберіть зручний для вас спосіб комунікації
                    </p>
                    <div className="space-y-4">
                      <button
                        onClick={() => setStep('callback')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer"
                      >
                        <Phone size={20} className='cursor-pointer' /> Замовити зворотний дзвінок
                      </button>
                      <button
                        onClick={() => setStep('messengers')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer"
                      >
                        <MessageCircle size={20} /> Написати в месенджер
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 'callback' && (
                  <motion.div
                    key="callback"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <button
                      onClick={() => setStep('choose')}
                      className="text-white hover:text-blue-700 mb-4 flex items-center gap-2 cursor-pointer"
                      disabled={isSubmitting}
                    >
                      ← Назад
                    </button>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Зворотний дзвінок
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Залиште ваші контактні дані, і ми зв'яжемося з вами
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Ваше ім'я *
                        </label>
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
                        <label className="block text-sm font-medium text-white mb-2">
                          Номер телефону *
                        </label>
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
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} /> Відправляємо...
                          </>
                        ) : (
                          'Замовити дзвінок'
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 'messengers' && (
                  <motion.div
                    key="messengers"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <button
                      onClick={() => setStep('choose')}
                      className="text-white hover:text-blue-700 mb-4 flex items-center gap-2 cursor-pointer"
                    >
                      ← Назад
                    </button>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Оберіть месенджер</h2>
                    <p className="text-gray-400 mb-6">Напишіть нашому менеджеру</p>
                    <div className="space-y-4">
                      <button
                        onClick={handleTelegramClick}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer"
                      >
                        Telegram
                      </button>
                      <button
                        onClick={handleViberClick}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer"
                      >
                        Viber
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Дякуємо!</h2>
                    <p className="text-gray-400">Очікуйте зворотнього зв'язку найближчим часом.</p>
                  </motion.div>
                )}

                {step === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Упс! Щось пішло не так</h2>
                    <p className="text-gray-400 mb-4">
                      {apiError || 'Не вдалося відправити дані. Спробуйте ще раз.'}
                    </p>
                    <button
                      onClick={handleRetry}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition-colors cursor-pointer"
                    >
                      Спробувати ще раз
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
