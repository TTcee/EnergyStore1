// src/components/Footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="w-full text-white"
      style={{ background: 'linear-gradient(3.79deg, #0D0D0D, #4635A9)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
        
        {/* Лівий блок: логотип */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Лого" className="w-24" />
        </div>

        {/* Середній блок: меню */}
        <ul className="flex flex-wrap md:justify-start gap-x-10 text-sm md:text-base font-montserratAlt">
          <li><Link href="/">Головна</Link></li>
          <li><Link href="/about">Про нас</Link></li>
          <li><Link href="/production-services">Послуги</Link></li>
          <li><Link href="/products/product1">Товари</Link></li>
          <li><Link href="/repair">Ремонт</Link></li>
          <li><Link href="/contact">Контакти</Link></li>
        </ul>

        {/* Правий блок: соцмережі */}
        <div className="flex space-x-4">
          <img src="/arrow.png" alt="Instagram" className="w-7 h-8" />
        </div>
      </div>

      {/* Лінія і копірайт */}
      <div className="border-t border-white/50 mt-6 pt-4 text-xs text-white/70 max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div>© 2025</div>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <img src="/Telegram.png" alt="Telegram" className="w-7 h-7" />
          <img src="/Instagram.png" alt="Instagram" className="w-6 h-6" />
          <img src="/Tiktok.png" alt="TikTok" className="w-6 h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
