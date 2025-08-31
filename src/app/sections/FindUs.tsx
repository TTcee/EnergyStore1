import { House, Phone, Mail } from "lucide-react";

export default function FindUs() {
  return (
    <section
      id="findus"
      className="min-h-screen flex items-center justify-center text-black px-4 sm:px-6 lg:px-10 py-10 snap-start pt-20 lg:pt-10"
    >
    <img src="/shademain2.png" alt="Моє зображення" className="absolute w-200 z-[-9] ml-[-1400] mt-50" />
    <img src="/shademain2.png" alt="Моє зображення" className="absolute w-150 z-[-9] ml-300 " />
    <img src="/shademain2.png" alt="Моє зображення" className="absolute w-200 z-[-9] ml-[-200] mt-70" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-12">
        {/* Ліва частина */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl text-white lg:text-4xl font-extrabold">
            Де нас знайти
          </h2>
          <hr className="border-white border-[1.5px] w-sm sm:md md:md md:w-[80%]" />

          <div className="space-y-5 text-base text-white sm:text-lg">
            <p className="flex">
              <House className="w-8 h-8 text-white-100 mr-4" />
              <span className="font-normal font-montserrat font-xs"></span> вул. Городоцька, 174, Львів
            </p>
            <p className="flex">
              <Phone className="w-8 h-8 text-white-100 mr-4 text-sm sm:text-sm" />
              <span className="font-normal font-montserrat"></span> +38 (098) 174-14-88
            </p>
            <p className="flex">
              <Mail className="w-8 h-8 text-white-400 mr-4" />
              <a href="mailto:eneergystore@gmail.com" className="cursor-pointer"><span className="font-normal font-montserrat"></span>eneergystore@gmail.com</a>
            </p>
          </div>

          <hr className="border-white border-[1.5px] w-sm sm:md md-md md:w-[80%]" />

          <div className="text-white">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Графік роботи:
            </h3>
            <p className="text-[18px] mt-3">Пн–Пт: 10:00 – 17:00</p>
            <p className="text-[18px] mt-3">Сб–Нд: вихідний</p>
          </div>
        </div>

        {/* Права частина (карта) */}
        <div
          className="ml-[-100] 
          w-full h-64      
          sm:w-[90%] sm:h-80 
          md:w-[100%] md:h-[300px] 
          lg:w-[100%] lg:h-[350px] 
          xl:w-[100%] xl:h-[410px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.5575927768773!2d23.9686505!3d49.8319797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae74070ed9ee3%3A0x965ed1e1bb37a3c9!2sEnergy%20Store!5e0!3m2!1suk!2sua!4v1756306870511!5m2!1suk!2sua"
            className="w-sm ml-32 h-full rounded-lg shadow-lg sm:w-2xl sm:ml-[-20] md:w-[110%] md:ml-10 lg:w-2xl"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}


