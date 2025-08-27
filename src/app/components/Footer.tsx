// src/components/Footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full text-white pb-5 bg-[linear-gradient(3.79deg,#0D0D0D_-17.01%,#4635A9_734.79%)]">
      <div className="max-w-[1240px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
        
        {/* Лівий блок: логотип */}
        <div className="flex justify-center md:justify-start">
          <img src="/logo.png" alt="Лого" className="w-24" />
        </div>

        {/* Середній блок: меню */}
        <ul className="flex flex-col md:flex-row md:justify-start gap-y-3 md:gap-y-0 md:gap-x-10 text-sm md:text-base font-montserratAlt text-center md:text-left space-x-10">
          <li><Link href="/">Головна</Link></li>
          <li><Link href="/about">Про нас</Link></li>
          <li><Link href="/production-services">Послуги</Link></li>
          <li><Link href="/products/product1">Товари</Link></li>
          <li><Link href="/repair">Ремонт</Link></li>
          <li><Link href="/contact">Контакти</Link></li>
        </ul>

        {/* Правий блок: кнопка/іконка */}
        <div className="flex justify-center md:justify-end">
          <img src="/arrow.png" alt="Arrow" className="w-7 h-8" />
        </div>
      </div>

      {/* Лінія і копірайт */}
      <div className="max-w-[1240px] mx-auto border-t border-white/50 mt-6 pt-4 text-xs text-white/70 px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-3 md:mb-0">© 2025</div>
        <div className="flex space-x-6">
          <img src="/Telegram.png" alt="Telegram" className="w-7 h-7" />
          <img src="/Instagram.png" alt="Instagram" className="w-6 h-6" />
          <img src="/Tiktok.png" alt="TikTok" className="w-6 h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
