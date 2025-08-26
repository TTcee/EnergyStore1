import Link from "next/link";

export default function ProductionServices() {
  const products = [
    { name: "Товар 1", href: "/products/Hailong" },
    { name: "Товар 2", href: "/products/YourSize" },
    { name: "Товар 3", href: "/products/YourElements" },
    { name: "Товар 4", href: "/products/Bike" },
    { name: "Товар 5", href: "/products/Individual" },
    { name: "Товар 6", href: "/products/SaveEnergySystem" },
  ];

  return (
    <section
      id="production"
      className="min-h-screen flex flex-col items-center justify-center  text-black"
    >
      <h2 className="text-3xl font-semibold mb-8">Виробничі послуги</h2>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.name}
            href={product.href}
            className="bg-white text-black font-medium py-4 px-6 rounded-lg shadow hover:bg-gray-200 text-center"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
