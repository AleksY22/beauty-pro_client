import Link from 'next/link';

export interface BreadcrumbItem {
   text: string;
   href?: string;
}

interface BreadcrumbsProps {
   items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
   return (
      <nav className="w-full mt-6 mb-5">
         <div className="w-full mx-auto px-4 pb-2.5 overflow-x-auto scrollbar-none">
            <ul className="flex items-center whitespace-nowrap min-w-max">
               {/* Базовый элемент "Главная" */}
               <li className="inline-block pr-4 mr-2.5 relative text-[15px] leading-4.5">
                  <Link
                     href="/"
                     className="text-gray-500 hover:text-[#f7b5b2] transition-colors duration-200 no-underline"
                  >
                     Главная
                  </Link>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none text-[12px]">
                     |
                  </span>
               </li>

               {/* Динамические элементы */}
               {items.map((item, index) => {
                  const isLast = index === items.length - 1;

                  return (
                     <li
                        key={index}
                        className="inline-block pr-4 mr-2.5 relative text-[15px] leading-4.5"
                     >
                        {isLast || !item.href ? (
                           <span className="text-[#f7b5b2] font-normal select-none">
                              {item.text}
                           </span>
                        ) : (
                           <Link
                              href={item.href}
                              className="text-gray-500 hover:text-[#f7b5b2] transition-colors duration-200 no-underline"
                           >
                              {item.text}
                           </Link>
                        )}

                        {!isLast && (
                           <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none text-[12px]">
                              |
                           </span>
                        )}
                     </li>
                  );
               })}
            </ul>
         </div>
      </nav>
   );
}
