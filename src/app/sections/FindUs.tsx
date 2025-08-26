export default function FindUs() {
  return (
    <section
      id="findus"
      className="min-h-screen flex items-center justify-center  text-black px-10"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Ліва частина */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Де нас знайти</h2>
          <hr className="border-black" />

          <div className="space-y-2">
            <p><span className="font-semibold">Адреса:</span> вул. Прикладна, 174, Львів</p>
            <p><span className="font-semibold">Телефон:</span> +38 (067) 123-45-67</p>
            <p><span className="font-semibold">Email:</span> info@example.com</p>
          </div>

          <hr className="border-black" />

          <div>
            <h3 className="text-xl font-medium mb-2">Графік роботи</h3>
            <p>Пн–Пт: 9:00 – 18:00</p>
            <p>Сб-Нд: вихідний</p>
          </div>
        </div>

        {/* Права частина (карта) */}
        <div className="w-full h-[400px] md:h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d321.6899250322548!2d23.966321125358533!3d49.83269743378899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae760b1341f13%3A0x35cf4e329cec890!2z0LLRg9C70LjRhtGPINCT0L7RgNC-0LTQvtGG0YzQutCwLCAxNzQsINCb0YzQstGW0LIsINCb0YzQstGW0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNzkwMDA!5e0!3m2!1suk!2sua!4v1756232096217!5m2!1suk!2sua"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
