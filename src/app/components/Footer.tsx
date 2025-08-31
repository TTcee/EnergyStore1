// src/components/Footer.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  // Перевіряємо чи ми на сторінці товару
  const isProductPage = pathname.startsWith("/products");

  return (
    <footer className="w-full text-white pb-5 bg-[linear-gradient(3.79deg,#0D0D0D_-17.01%,#4635A9_734.79%)]">
      <div className="max-w-[1240px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:px-2">

        {/* Логотип */}
        <div className="flex justify-center md:justify-start mb-6 md:mb-0 hover:scale-105 transform transition-transform duration-300">
          <a href="/#hero"><img src="/logo.png" alt="Лого" className="w-24" /></a>
        </div>

        {/* Меню */}
        <ul className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm md:text-base font-montserratAlt text-center md:flex md:gap-x-10 md:text-left md:space-x-3 mb-6 md:mb-0 md:ml-20 lg:ml-40">
          <li className="hover:scale-105 transform transition-transform duration-300"><Link href="/#hero">Головна</Link></li>
          <li className="hover:scale-105 transform transition-transform duration-300"><Link href="/#about">Про нас</Link></li>
          <li className="hover:scale-105 transform transition-transform duration-300"><Link href="/#offer">Послуги</Link></li>
          <li className="hover:scale-105 transform transition-transform duration-300"><Link href="/#production">Товари</Link></li>
          <li className="hover:scale-105 transform transition-transform duration-300"><Link href="/#repair">Ремонт</Link></li>
          <li className="hover:scale-105 transform transition-transform duration-300"><Link href="/#findus">Контакти</Link></li>
        </ul>

        {/* Стрілка */}
        {!isProductPage && (
          <div className="flex justify-center md:justify-end">
            <a href="/#hero"><img src="/arrow.png" alt="Arrow" className="w-7 h-8 hover:scale-115 transform transition-transform duration-300 lg:ml-60 md:ml-5" /></a>
          </div>
        )}
      </div>

      {/* Лінія і копірайт */}
      <div className="max-w-[1240px] mx-auto border-t border-white/50 mt-6 pt-4 text-xs text-white/70 px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-3 md:mb-0">© 2025</div>
        <div className="flex space-x-6">
          <a href="https://t.me/energy_storee" target="_blank" rel="noopener noreferrer"><img src="/Telegram.png" alt="Telegram" className="w-7 h-7 hover:scale-115 transform transition-transform duration-300" /></a>
          <img src="/Instagram.png" alt="Instagram" className="w-6 h-6 hover:scale-115 transform transition-transform duration-300" />
          <img src="/Tiktok.png" alt="TikTok" className="w-6 h-6 hover:scale-115 transform transition-transform duration-300" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
