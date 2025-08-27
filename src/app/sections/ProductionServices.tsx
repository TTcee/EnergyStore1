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
    <div className="bg-gray-800 rounded-lg p-6 text-white max-w-sm">
      {/* Зображення товару */}
      <div className="mb-6 flex justify-center">
        <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-contain rounded-lg" />
          ) : (
            <div className="w-20 h-16 bg-gray-600 rounded"></div>
          )}
        </div>
      </div>

      {/* Назва товару */}
      <h3 className="text-xl font-bold mb-3">{title}</h3>

      {/* Опис */}
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        {description}
      </p>

      {/* Нижня частина з кнопкою та ціною */}
      <div className="flex items-center justify-between">
        <Link href={href}>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            {buttonText}
          </button>
        </Link>
        <span className="text-green-400 font-bold text-lg">
          від {price} ₴
        </span>
      </div>
    </div>
  );
};

export default function ProductionServices() {
  const products = [
    {
      title: "Hailong",
      description: "Надійне та зручне рішення для велосипедів: компактне кріплення, захист і гарний зовнішній дизайн.",
      price: "1 100",
      href: "/products/Hailong",
      image: undefined
    },
    {
      title: "Акумулятор під Ваш розмір",
      description: "Акумулятори у термоусадці — надійні, компактні та готові до використання.",
      price: "1 200",
      href: "/products/YourSize",
      image: undefined
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
      image: undefined
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
      className="min-h-screen flex flex-col items-center justify-center  text-white py-16"
    >
      <h2 className="text-3xl font-semibold mb-12">Виробничі послуги</h2>
      
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