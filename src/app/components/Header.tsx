// src/components/Header.tsx
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 w-full h-[70px] bg-gradient-to-tr from-[#0D0D0D] to-[#4635A9] z-50">
      <nav className="flex items-center pl-40 space-x-8 font-montserratAlt list-none h-full">
        {/* Логотип */}
        <li>
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        </li>

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
