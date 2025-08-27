// src/components/Header.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // іконки гамбургера

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Головна" },
    { href: "/about", label: "Про нас" },
    { href: "/production-services", label: "Послуги" },
    { href: "/products/product1", label: "Товари" },
    { href: "/repair", label: "Ремонт" },
    { href: "/contact", label: "Контакти" },
  ];

  return (
    <header className="sticky top-0 w-full h-[70px] bg-[linear-gradient(3.79deg,#0D0D0D_-17.01%,#4635A9_734.79%)] z-50">
      <nav className="flex items-center px-4 md:px-40 font-montserratAlt h-full">
        {/* Логотип */}
        <img src="/logo.png" alt="Лого" className="w-[92px]" />

        {/* Desktop меню */}
        <ul className="hidden md:flex items-center space-x-20 list-none ml-20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`relative after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%]
                              after:bottom-[-6px] after:h-[2px] after:bg-white 
                              after:transition-all after:duration-300 after:ease-out
                              ${isActive ? "after:w-[40px]" : "after:w-0 group-hover:after:w-[40px]"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile кнопка */}
        <button
          className="md:hidden text-white ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile меню */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-6 py-6 bg-black/90 text-white font-montserratAlt">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)} // закривати після кліку
                  className={`relative after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%]
                              after:bottom-[-6px] after:h-[2px] after:bg-white 
                              after:transition-all after:duration-300 after:ease-out
                              ${isActive ? "after:w-[40px]" : "after:w-0 group-hover:after:w-[40px]"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
};

export default Header;
