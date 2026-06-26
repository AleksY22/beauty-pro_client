import Image from 'next/image';

interface AdvantageItem {
   id: number;
   image: string;
   title: string;
   text: string;
}

const ADVANTAGES: AdvantageItem[] = [
   {
      id: 1,
      image: '/advantage/advantage-item1.webp',
      title: 'Все для салонов',
      text: 'Мультибрендовый магазин для мастеров маникюра, педикюра, бровистов, lash-мейкеров, мастеров депиляции.',
   },
   {
      id: 2,
      image: '/advantage/advantage-item2.webp',
      title: 'Система скидок',
      text: 'Растущие скидки по дисконтным картам для постоянных клиентов - больше накоплений - больше скидка',
   },
   {
      id: 3,
      image: '/advantage/advantage-item3.webp',
      title: 'Быстрая доставка',
      text: 'Доставка при покупке от 200 руб бесплатно день в день, при покупке на любую сумму доставка Яндекс.курьрер за счет покупателя',
   },
];

export function Advantage() {
   return (
      <div
         style={{ backgroundImage: 'url("/advantage/advantage-bg1.webp")' }}
         className="w-full max-w-352 mx-auto bg-center bg-cover bg-no-repeat"
      >
         <div className="w-full mx-auto px-4 py-11">
            <h2 className="font-bold text-[26px] sm:text-[36px] leading-10.75 text-center text-black mb-10.5">
               Преимущества Beauty PRO
            </h2>

            <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-y-8 lg:gap-x-12.5">
               {ADVANTAGES.map((item) => (
                  <div
                     key={item.id}
                     className="flex w-full max-w-115 mx-auto lg:mx-0 items-start text-left"
                  >
                     <div className="relative w-15 sm:w-25 h-15 sm:h-25 mr-7 shrink-0">
                        <Image
                           src={item.image}
                           alt={item.title}
                           fill
                           sizes="100px"
                           className="object-contain"
                        />
                     </div>

                     <div className="flex flex-col">
                        <h3 className="text-[24px] leading-7 font-medium text-black mb-3 wrap-break-word">
                           {item.title}
                        </h3>

                        <p className="text-[14px] leading-4 text-gray-800 wrap-break-word">
                           {item.text}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
