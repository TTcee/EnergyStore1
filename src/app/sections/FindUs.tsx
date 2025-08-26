import { House, Phone, Mail } from "lucide-react";

export default function FindUs() {
  return (
    <section
      id="findus"
      className="min-h-screen flex items-center justify-center  text-black px-4 sm:px-6 lg:px-10 py-10
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Ліва частина */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl text-white lg:text-4xl font-extrabold">
            Де нас знайти
          </h2>
          <hr className="border-white border-[1.5px] w-3.5/4 sm:w-2.5/3 md:w-1.3/2" />

          <div className="space-y-5 text-base text-white sm:text-lg">
            <p className="flex">
              <House className="w-8 h-8 text-yellow-400 mr-4" />
              <span className="font-semibold">Адреса:</span> вул. Городоцька, 174, Львів
            </p>
            <p className="flex">
              <Phone className="w-8 h-8 text-yellow-400 mr-4" />
              <span className="font-semibold">Телефон:</span> +38 (098) 174-14-88
            </p>
            <p className="flex">
              <Mail className="w-8 h-8 text-yellow-400 mr-4" />
              <span className="font-semibold">Email:</span> energystore1@gmail.com
            </p>
          </div>

          <hr className="border-white border-[1.5px] w-3.5/4 sm:w-2.5/3 md:w-1.2/2" />

          <div className="text-white">
            <h3 className="text-lg sm:text-xl  font-semibold mb-2">
              Графік роботи:
            </h3>
            <p>Пн–Пт: 10:00 – 17:00</p>
            <p>Сб–Нд: вихідний</p>
          </div>
        </div>

        {/* Права частина (карта) */}
        <div className="mx-auto 
        w-full h-64      
        sm:w-[90%] sm:h-80 
        md:w-[100%] md:h-[250px] 
        lg:w-[100%] lg:h-[350px] 
        xl:w-[100%] xl:h-[410px]"
        >
        <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d321.6899250322548!2d23.966321125358533!3d49.83269743378899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae760b1341f13%3A0x35cf4e329cec890!2z0LLRg9C70LjRhtGPINCT0L7RgNC-0LTQvtGG0YzQutCwLCAxNzQsINCb0YzQstGW0LIsINCb0YzQstGW0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNzkwMDA!5e0!3m2!1suk!2sua!4v1756232096217!5m2!1suk!2sua"
         className="w-full h-full rounded-lg shadow-lg"
         style={{ border: 0 }}
        loading="lazy"
        ></iframe>
        </div>
      </div>
    </section>
  );
}
