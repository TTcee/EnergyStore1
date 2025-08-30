import Link from "next/link";

// Типи для компонента
interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image?: string;
  buttonText?: string;
  href: string;
}

// Компонент картки товару
const ProductCard = ({ 
  title, 
  description, 
  price, 
  image, 
  buttonText = "Переглянути",
  href 
}: ProductCardProps) => {
  return (
    <Link href={href}>

    <div className="relative group bg-[linear-gradient(110.99deg,rgba(255,255,255,0.08)_-24.09%,rgba(115,115,115,0.04)_118.13%)] 
             backdrop-blur-[9px] rounded-[6px] p-6 text-white max-w-sm h-[400px] flex flex-col transition-transform duration-300 hover:scale-[1.03]">
      <div className="absolute inset-0 overflow-hidden rounded-[6px]">
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
  </div>
</div>
      {/* Блок для зображення */}
      <div className="flex justify-center items-center h-[180px] mb-4">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="h-full object-contain z-20"
          />
        ) : (
          <div className="w-32 h-24 bg-gray-600 rounded"></div>
        )}
      </div>

      {/* Назва + опис */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Кнопки й ціна завжди внизу */}
      <div className="flex items-center justify-between mt-auto">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
            {buttonText}
          </button>
        <span className="text-green-400 font-bold text-lg">
          від {price} ₴
        </span>
      </div>
    </div>
    </Link>
  );
};



export default function ProductionServices() {
  const products = [
    {
      title: "Hailong",
      description: "Надійне та зручне рішення для велосипедів: компактне кріплення, захист і гарний зовнішній дизайн.",
      price: "1 100",
      href: "/products/Hailong",
      image: "/hailong.png"
    },
    {
      title: "Акумулятор під Ваш розмір",
      description: "Акумулятори у термоусадці — надійні, компактні та готові до використання.",
      price: "1 200",
      href: "/products/YourSize",
      image: "/termo.png"
    },
    {
      title: "Акумулятор з Ваших елементів",
      description: "Ми зберемо акумулятори з ваших елементів, використовуючи професійне обладнання.",
      price: "1 300",
      href: "/products/YourElements",
      image: undefined
    },
    {
      title: "Комплектація велосипеда з коробкою",
      description: "Акумулятор у коробці під раму з можливістю інтеграції контролера.",
      price: "3 600",
      href: "/products/Bike",
      image: undefined
    },
    {
      title: "Індивідуальні акумулятори",
      description: "Оптимальні елементи та надійна збірка під ваші індивідуальні задачі.",
      price: "2 100",
      href: "/products/Individual",
      image: "/individual.png"
    },
    {
      title: "Акумулятори для систем збереження енергії",
      description: "Потужні акумулятори для енергозберігаючі та автономних систем.",
      price: "112 000",
      href: "/products/SaveEnergySystem",
      image: undefined
    }
  ];

  return (
    <section
      id="production"
      className="min-h-screen flex flex-col items-center justify-center  text-white py-16 snap-start"
    >
    <img src="/shademain2.png" alt="Моє зображення" className="absolute w-150 z-[-9] mt-[-1000] ml-[-1300]  " />
    <img src="/shademain2.png" alt="Моє зображення" className="absolute w-150 z-[-9] mt-[-300] ml-300" />


      <h2 className="text-3xl md:text-4xl font-extrabold mb-12 lg:ml-[-830]">Виробничі послуги</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            description={product.description}
            price={product.price}
            href={product.href}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}