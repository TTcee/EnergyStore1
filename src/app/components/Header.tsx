"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#hero", label: "Головна" },
  { href: "#about", label: "Про нас" },
  { href: "#offer", label: "Послуги" },
  { href: "#production", label: "Товари" },
  { href: "#repair", label: "Ремонт" },
  { href: "#findus", label: "Контакти" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 80; // поправка на шапку
      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          const bottom = top + section.clientHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 w-full h-[70px] bg-[linear-gradient(3.79deg,#0D0D0D_-17.01%,#4635A9_734.79%)] z-50">
      <nav className="flex items-center px-4 md:px-40 font-montserratAlt h-full">
        {/* Логотип */}
        <img src="/logo.png" alt="Лого" className="w-[92px]" />

        {/* Desktop меню */}
        <ul className="hidden md:flex items-center space-x-20 list-none ml-20">
          {navItems.map((item) => (
            <li key={item.href} className="relative group font-[14px]">
              <a
                href={item.href}
                className={`relative after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%]
                          after:bottom-[-6px] after:h-[2px] after:bg-white 
                          after:transition-all after:duration-300 after:ease-out
                          ${activeSection === item.href ? "after:w-[40px]" : "after:w-0 group-hover:after:w-[40px]"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
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
        <ul className="md:hidden flex flex-col items-center space-y-6 py-6 bg-black/90 text-white  font-montserratAlt">
          {navItems.map((item) => (
            <li key={item.href} className="relative group">
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`relative after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%]
                          after:bottom-[-6px] after:h-[2px] after:bg-white 
                          after:transition-all after:duration-300 after:ease-out
                          ${activeSection === item.href ? "after:w-[40px]" : "after:w-0 group-hover:after:w-[40px]"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
