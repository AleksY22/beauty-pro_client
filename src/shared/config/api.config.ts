export const SERVER_URL = process.env.SERVER_URL as string;

export const API_URL = {
   root: (url = '') => `${url ? url : ''}`,

   //пути из бэка
   auth: (url = '') => API_URL.root(`/auth/${url}`),
   users: (url = '') => API_URL.root(`/users/${url}`),
   products: (url = '') => API_URL.root(`/products/${url}`),
   variants: (url = '') => API_URL.root(`/variants/${url}`),
   attributes: (url = '') => API_URL.root(`/attributes/${url}`),
   properties: (url = '') => API_URL.root(`/variant-properties/${url}`),
   categories: (url = '') => API_URL.root(`/categories${url ? `/${url}` : ''}`),
   // categories: (url = '') => API_URL.root(`/categories/${url}`),
   promotions: (url = '') => API_URL.root(`/promotions/${url}`),
   advertisements: (url = '') => API_URL.root(`/advertisements/${url}`),
   colors: (url = '') => API_URL.root(`/colors/${url}`),
   deliveries: (url = '') => API_URL.root(`/deliveries/${url}`),
   payments: (url = '') => API_URL.root(`/payments/${url}`),
   reviews: (url = '') => API_URL.root(`/reviews/${url}`),
   orders: (url = '') => API_URL.root(`/orders/${url}`),
   files: (url = '') => API_URL.root(`/files/${url}`),
   statistics: (url = '') => API_URL.root(`/statistics/${url}`),
   cart: (url = '') => API_URL.root(`/cart/${url}`),
};
