// src/components/Header.tsx
import React from "react";
import Link from "next/link";


const Header = () => {
  return (
    <header className="sticky top-0 w-full h-[70px] bg-[linear-gradient(3.79deg,#0D0D0D_-17.01%,#4635A9_734.79%)]
 z-45">
      <nav className="flex items-center px-4 md:px-40 space-x-4 md:space-x-20 font-montserratAlt h-full list-none">

        {/* Логотип */}
        <li> <img src="/logo.png" alt="ЛОго" className="w-23" />        </li>

        {/* Пункти меню */}
        <li>
          <Link href="/">Головна</Link>
        </li>
        <li>
          <Link href="/about">Про нас</Link>
        </li>
        <li>
          <Link href="/production-services">Послуги</Link>
        </li>
        <li>
          <Link href="/products/product1">Товари</Link>
        </li>
        <li>
          <Link href="/repair">Ремонт</Link>
        </li>
        <li>
          <Link href="/contact">Контакти</Link>
        </li>
      </nav>
    </header>
  );
};

export default Header;
