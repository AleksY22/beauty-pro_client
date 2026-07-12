import Image from 'next/image';
import Link from 'next/link';

const HELP_LINKS = [
   { text: 'Доставка и оплата', href: '/help/delivery' },
   { text: 'Как сделать заказ', href: '/help/order' },
   { text: 'Возврат', href: '/help/returns' },
   { text: 'Политика конфиденциальности', href: '/help/privacy' },
];

const COMPANY_LINKS = [
   { text: 'О нас', href: '/company/about' },
   { text: 'Адреса наших магазинов', href: '/company/shops' },
   { text: 'Наши вакансии', href: '/company/careers' },
   { text: 'Сотрудничество с нами', href: '/company/cooperation' },
];

const SOCIAL_ICONS = [
   { id: 'vk', src: '/footer/footer-icon-vk.webp', href: 'https://vk.com' },
   {
      id: 'inst',
      src: '/footer/footer-icon-inst.webp',
      href: 'https://instagram.com',
   },
   {
      id: 'fb',
      src: '/footer/footer-icon-fb.webp',
      href: 'https://facebook.com',
   },
];

const PAYMENT_ICONS = [
   { id: 1, src: '/footer/payment-item1.webp' },
   { id: 2, src: '/footer/payment-item2.webp' },
   { id: 3, src: '/footer/payment-item3.webp' },
];

export function Footer() {
   return (
      <footer className="mx-5 lg:mx-14">
         <div className="w-full mx-auto max-w-352">
            <div
               style={{ backgroundImage: 'url("/footer/footer-bg.webp")' }}
               className="bg-center bg-cover bg-no-repeat mx-auto"
            >
               <div className="flex flex-col p-5">
                  <div className="flex flex-col md:flex-row md:justify-between flex-wrap justify-center space-y-6.25 md:space-y-0">
                     <div className="flex flex-col w-full md:w-auto items-center md:items-start">
                        <h3 className="text-[16px] font-semibold text-gray-100 mb-3.75 uppercase">
                           Помощь
                        </h3>
                        <ul className="flex flex-col space-y-2">
                           {HELP_LINKS.map((link, index) => (
                              <li
                                 key={index}
                                 className="text-center md:text-left"
                              >
                                 <Link
                                    href={link.href}
                                    className="text-sm text-gray-100 hover:text-gray-600 transition-colors duration-200 no-underline font-medium"
                                 >
                                    {link.text}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>

                     <div className="flex flex-col w-full md:w-auto items-center md:items-start">
                        <h3 className="text-[16px] font-semibold text-gray-100 mb-3.75 uppercase">
                           О компании
                        </h3>
                        <ul className="flex flex-col space-y-2">
                           {COMPANY_LINKS.map((link, index) => (
                              <li
                                 key={index}
                                 className="text-center md:text-left"
                              >
                                 <Link
                                    href={link.href}
                                    className="text-sm text-gray-100 hover:text-gray-600 transition-colors duration-200 no-underline font-medium"
                                 >
                                    {link.text}
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>

                     <div className="flex flex-col w-full md:w-auto items-center md:items-start">
                        <h3 className="text-[16px] font-semibold text-gray-100 mb-3.75 uppercase">
                           Beauty PRO в соцсетях
                        </h3>

                        <div className="flex items-center gap-3 mb-6">
                           {SOCIAL_ICONS.map((icon) => (
                              <a
                                 key={icon.id}
                                 href={icon.href}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="relative w-8 h-8 transition-transform duration-200 hover:scale-110 block"
                              >
                                 <Image
                                    src={icon.src}
                                    alt={icon.id}
                                    sizes="32px"
                                    fill
                                    className="object-contain"
                                 />
                              </a>
                           ))}
                        </div>

                        <div className="flex flex-col items-center md:items-start">
                           <div className="text-sm text-gray-100 mb-3 font-medium">
                              Способы оплаты
                           </div>
                           <div className="flex items-center space-x-6.25">
                              {PAYMENT_ICONS.map((icon) => (
                                 <div
                                    key={icon.id}
                                    className="relative w-12 h-8"
                                 >
                                    <Image
                                       src={icon.src}
                                       alt="Способ оплаты"
                                       fill
                                       sizes="48px"
                                       className="object-contain"
                                    />
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-5 text-left border-t border-black/5 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-gray-100">
                     <div className="font-semibold">
                        © {new Date().getFullYear()} Beauty PRO
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}
