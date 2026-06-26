export function formatPrice(price: number) {
   return price.toLocaleString('ru-BY', {
      style: 'currency',
      currency: 'BYN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   });
}
