'use client';

import { IFilterParams } from '@/features/product-variant/types/product-variant.interface';

interface AvailableAttribute {
   name: string;
   values: string[];
}

interface ProductFiltersProps {
   activeFilters: IFilterParams;
   onFilterChange: (filters: IFilterParams) => void;
   availableAttributes?: AvailableAttribute[]; // Передаем доступные фильтры из категории
}

export function ProductFilters({
   activeFilters,
   onFilterChange,
   availableAttributes = [],
}: ProductFiltersProps) {
   const { attributes = {} } = activeFilters;

   // Обработчик переключения чекбокса характеристики
   const handleAttributeChange = (attrName: string, value: string) => {
      const currentValues = attributes[attrName] || [];
      const newValues = currentValues.includes(value)
         ? currentValues.filter((v) => v !== value) // Удаляем, если галочка уже стояла
         : [...currentValues, value]; // Добавляем, если галочки не было

      const updatedAttributes = { ...attributes, [attrName]: newValues };

      // Если в группе не осталось выбранных чекбоксов, удаляем эту группу полностью
      if (newValues.length === 0) {
         delete updatedAttributes[attrName];
      }

      // Немедленно отправляем обновленные фильтры наверх
      onFilterChange({
         attributes:
            Object.keys(updatedAttributes).length > 0
               ? updatedAttributes
               : undefined,
      });
   };

   return (
      <div className="w-full lg:w-64 border border-gray-100 p-4 rounded-md shrink-0 h-fit space-y-6">
         <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-[16px] uppercase tracking-wider">
               Фильтры
            </h3>
            {Object.keys(attributes).length > 0 && (
               <button
                  type="button"
                  onClick={() => onFilterChange({})}
                  className="text-[12px] text-gray-400 hover:text-[#F7BAB5] transition-colors"
               >
                  Сбросить
               </button>
            )}
         </div>

         {/* Рендеринг групп характеристик */}
         {availableAttributes.map((attr) => (
            <div key={attr.name} className="space-y-3">
               <span className="text-[14px] font-semibold block uppercase tracking-wide">
                  {attr.name}
               </span>
               <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-none pr-1">
                  {attr.values.map((value) => {
                     const isChecked =
                        attributes[attr.name]?.includes(value) || false;
                     return (
                        <div
                           key={value}
                           className="flex items-center gap-2 cursor-pointer select-none"
                        >
                           <input
                              type="checkbox"
                              id={`${attr.name}-${value}`}
                              checked={isChecked}
                              onChange={() =>
                                 handleAttributeChange(attr.name, value)
                              }
                              className="w-4 h-4 rounded border-gray-300 text-[#F7BAB5] focus:ring-[#F7BAB5] cursor-pointer"
                           />
                           <label
                              htmlFor={`${attr.name}-${value}`}
                              className="text-[14px] text-gray-500 cursor-pointer"
                           >
                              {value}
                           </label>
                        </div>
                     );
                  })}
               </div>
            </div>
         ))}
      </div>
   );
}
