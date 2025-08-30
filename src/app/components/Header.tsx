"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";


const navItems = [
  { path: "/", sectionId: "hero", label: "Головна" },
  { path: "/", sectionId: "about", label: "Про нас" },
  { path: "/", sectionId: "offer", label: "Послуги" },
  { path: "/", sectionId: "production", label: "Товари" },
  { path: "/", sectionId: "repair", label: "Ремонт" },
  { path: "/", sectionId: "findus", label: "Контакти" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const router = useRouter();

  // Скрол по секціях на головній
  const scrollToSection = (item: typeof navItems[0]) => {
    setMenuOpen(false);
    if (window.location.pathname !== item.path) {
      router.push(`${item.path}#${item.sectionId}`);
    } else {
      const el = document.getElementById(item.sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Відслідковуємо активну секцію при скролі
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 80; // поправка на шапку
      for (const item of navItems) {
        const el = document.getElementById(item.sectionId);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(item.sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 h-20 w-full bg-[linear-gradient(3.79deg,#0D0D0D_-17.01%,#4635A9_734.79%)] z-50 justify-center">
  <nav className="flex items-center px-4 sm:px-6 md:px-20 py-2 md:py-3 font-montserratAlt">
    {/* Логотип */}
    <Link href="/#hero" ><img src="/logo.png" alt="Лого" className="w-20 sm:w-24 md:w-[92px] lg:ml-20 md:ml-[-20] ml-0 mr-20 mt-2" /></Link>

    {/* Desktop меню */}
    <ul className="hidden md:flex items-center space-x-8 lg:space-x-20 list-none space-x-10 mt-4 ">
      {navItems.map((item) => (
        <li key={item.sectionId} className="relative group font-[14px] ">
          <button
            onClick={() => scrollToSection(item)}
            className={`cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%]
              after:bottom-[-6px] after:h-[2px] after:bg-white 
              after:transition-all after:duration-300 after:ease-out
              ${activeSection === item.sectionId ? "after:w-[40px]" : "after:w-0 group-hover:after:w-[40px]"}`}
          >
            {item.label}
          </button>
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
    <ul className="md:hidden flex flex-col items-center space-y-6 py-6 bg-black/90 text-white font-montserratAlt">
      {navItems.map((item) => (
        <li key={item.sectionId} className="relative group">
          <button
            onClick={() => scrollToSection(item)}
            className={`relative after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%]
              after:bottom-[-6px] after:h-[2px] after:bg-white 
              after:transition-all after:duration-300 after:ease-out
              ${activeSection === item.sectionId ? "after:w-[40px]" : "after:w-0 group-hover:after:w-[40px]"}`}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )}
</header>

  );
};

export default Header;
