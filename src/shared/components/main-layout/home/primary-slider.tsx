/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

// Имитация данных
const slides = [
   {
      id: 1,
      title: 'КИБЕР ПОНЕДЕЛЬНИК! ФИКСИРУЕМ ЦЕНЫ!',
      link: '/catalog/sales',
      image: '/slider/primary-slider.png',
   },
   {
      id: 2,
      title: 'НОВАЯ КОЛЛЕКЦИЯ ДЛЯ МАНИКЮРА',
      link: '/catalog/manicure',
      image: '/slider/primary-slider.png',
   },
   {
      id: 3,
      title: 'КИБЕР ПОНЕДЕЛЬНИК! ФИКСИРУЕМ ЦЕНЫ!',
      link: '/catalog/sales',
      image: '/slider/primary-slider.png',
   },
];

export function PrimarySlider() {
   // Инициализация Embla слайдера с опцией бесконечной прокрутки (loop)
   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

   // Состояния для пагинации
   const [selectedIndex, setSelectedIndex] = useState(0);
   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

   // Обработчики кликов для кнопок навигации
   const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
   }, [emblaApi]);

   const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
   }, [emblaApi]);

   // Функция для перехода к конкретному слайду по индексу
   const scrollTo = useCallback(
      (index: number) => {
         if (emblaApi) emblaApi.scrollTo(index);
      },
      [emblaApi],
   );

   // Переключение активного индекса при смене слайда
   const onSelect = useCallback((emblaApi: any) => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
   }, []);

   // Инициализация данных пагинации при готовности слайдера
   useEffect(() => {
      if (!emblaApi) return;

      // Функция для первоначальной настройки и обновления при изменении размера окна
      const updateSnaps = () => {
         setScrollSnaps(emblaApi.scrollSnapList());
         setSelectedIndex(emblaApi.selectedScrollSnap());
      };

      // Вызываем внутри обработчиков событий Embla, чтобы избежать синхронного вызова в теле эффекта
      emblaApi.on('init', updateSnaps);
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', updateSnaps);

      // Если API уже готов к моменту подписки, принудительно обновляем в следующем тике
      if (emblaApi.scrollSnapList().length > 0) {
         updateSnaps();
      }

      return () => {
         emblaApi.off('init', updateSnaps);
         emblaApi.off('select', onSelect);
         emblaApi.off('reInit', updateSnaps);
      };
   }, [emblaApi, onSelect]);

   return (
      <div className="w-full py-6">
         <div className="mx-auto px-4 relative">
            {/* Ограничитель видимости слайдера (Viewport) */}
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
               {/* Контейнер для слайдов (Flex-ряд) */}
               <div className="flex">
                  {slides.map((slide) => (
                     <div
                        key={slide.id}
                        className="min-w-full relative shrink-0"
                     >
                        <div className="relative aspect-21/9 md:aspect-3/1 w-full bg-neutral-900 overflow-hidden flex items-center justify-center">
                           {/* Фоновое изображение слайда */}
                           <div className="absolute inset-0 w-full h-full z-0">
                              <Image
                                 src={slide.image}
                                 alt={slide.title}
                                 fill
                                 loading="eager"
                                 priority={slide.id === 1} // Первая картинка загружается мгновенно
                                 className="object-cover object-center opacity-85 transition-transform duration-700"
                              />
                           </div>

                           {/* Контент поверх изображения */}
                           <div className="relative z-10 max-w-sm md:max-w-2xl px-8 md:px-16 flex flex-col gap-4 text-center items-center">
                              <h2 className="text-lg sm:text-3xl md:text-4xl text-gray-600 font-black tracking-wide leading-tight uppercase drop-shadow-md">
                                 {slide.title}
                              </h2>
                              <Link
                                 href={slide.link}
                                 className="inline-flex w-fit bg-white hover:bg-neutral-400 text-neutral-900 font-semibold px-6 py-3 rounded-lg shadow-sm transition-colors text-sm md:text-base text-center"
                              >
                                 Подробнее
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Кнопки управления (Стрелки) */}
            <div className="primary__slider-buttons absolute top-1/2 -translate-y-1/2 left-0 right-0 px-8 flex justify-between pointer-events-none z-20">
               <button
                  onClick={scrollPrev}
                  className="primary__slider-button primary__slider-button_prev pointer-events-auto w-8 h-8 md:w-11 md:h-11 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center cursor-pointer text-neutral-800 transition-all hover:scale-105 active:scale-95"
                  aria-label="Предыдущий слайд"
               >
                  <ChevronLeft className="w-6 h-6" />
               </button>

               <button
                  onClick={scrollNext}
                  className="primary__slider-button primary__slider-button_next pointer-events-auto w-8 h-8 md:w-11 md:h-11 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center cursor-pointer text-neutral-800 transition-all hover:scale-105 active:scale-95"
                  aria-label="Следующий слайд"
               >
                  <ChevronRight className="w-6 h-6" />
               </button>
            </div>
            {/* Блок пагинации (Точки) */}
            <div className="flex justify-center items-center gap-2 mt-2">
               {scrollSnaps.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => scrollTo(index)}
                     className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        index === selectedIndex
                           ? 'w-8 bg-neutral-800'
                           : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                     }`}
                     aria-label={`Перейти к слайду ${index + 1}`}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}
