'use client';

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

export function Pagination({
   currentPage,
   totalPages,
   onPageChange,
}: PaginationProps) {
   // Если страница всего одна, пагинацию не отображаем
   if (totalPages <= 1) return null;

   // Функция генерации массива страниц с троеточиями
   const getPages = () => {
      const pages: (number | string)[] = [];

      if (totalPages <= 7) {
         for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
         if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, '...', totalPages);
         } else if (currentPage >= totalPages - 3) {
            pages.push(
               1,
               '...',
               totalPages - 4,
               totalPages - 3,
               totalPages - 2,
               totalPages - 1,
               totalPages,
            );
         } else {
            pages.push(
               1,
               '...',
               currentPage - 1,
               currentPage,
               currentPage + 1,
               '...',
               totalPages,
            );
         }
      }
      return pages;
   };

   const pages = getPages();

   return (
      <nav
         className="flex items-center justify-center space-x-1 mt-10"
         aria-label="Pagination"
      >
         {/* Кнопка "Назад" */}
         <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors text-[14px]"
         >
            Назад
         </button>

         {/* Список номеров страниц */}
         {pages.map((page, index) => {
            if (page === '...') {
               return (
                  <span
                     key={`dots-${index}`}
                     className="px-3 h-9 flex items-center justify-center text-gray-400 select-none"
                  >
                     ...
                  </span>
               );
            }

            const isCurrent = page === currentPage;

            return (
               <button
                  key={`page-${page}`}
                  onClick={() => onPageChange(page as number)}
                  className={`px-3 h-9 min-w-9 flex items-center justify-center rounded text-[14px] font-medium transition-colors ${
                     isCurrent
                        ? 'bg-[#F7BAB5] text-black font-semibold'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
               >
                  {page}
               </button>
            );
         })}

         {/* Кнопка "Вперед" */}
         <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 h-9 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors text-[14px]"
         >
            Вперед
         </button>
      </nav>
   );
}
