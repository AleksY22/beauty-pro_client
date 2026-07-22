export const APP_URL = process.env.APP_URL as string;

export const PUBLIC_URL = {
   root: (url = '') => `${url ? url : ''}`,

   home: () => PUBLIC_URL.root('/'),
   cart: () => PUBLIC_URL.root('/cart'),
   order: () => PUBLIC_URL.root('/order'),
   catalog: (query = '') => PUBLIC_URL.root(`/catalog${query}`),

   auth: () => PUBLIC_URL.root('/auth'),
   register: () => PUBLIC_URL.root('/auth/register'),
   login: () => PUBLIC_URL.root('/auth/login'),
   success: () => PUBLIC_URL.root('/auth/success'),
   resetPassword: () => PUBLIC_URL.root('/auth/reset-password'),

   product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
   variant: (id = '') => PUBLIC_URL.root(`/variant/${id}`),
   category: (id = '') => PUBLIC_URL.root(`/category/${id}`),
};

export const DASHBOARD_URL = {
   root: (url = '') => `/dashboard${url ? url : ''}`,

   home: () => DASHBOARD_URL.root('/'),
   favorites: () => DASHBOARD_URL.root('/favorites'),
   settings: () => DASHBOARD_URL.root('/settings'),
};

export const ADMIN_URL = {
   root: (url = '') => `/admin${url ? url : ''}`,

   promotions: () => ADMIN_URL.root('/promotions'),
   promotionCreate: () => ADMIN_URL.root('/promotions/create'),
   promotionEdit: (id = '') => ADMIN_URL.root(`/promotions/${id}`),

   advertisements: () => ADMIN_URL.root('/advertisements'),
   advertisementCreate: () => ADMIN_URL.root('/advertisements/create'),
   advertisementEdit: (id = '') => ADMIN_URL.root(`/advertisements/${id}`),

   categories: () => ADMIN_URL.root('/categories'),
   categoryCreate: () => ADMIN_URL.root('/categories/create'),
   categoryEdit: (id = '') => ADMIN_URL.root(`/categories/${id}`),

   products: () => ADMIN_URL.root('/products'),
   productCreate: () => ADMIN_URL.root('/products/create'),
   productEdit: (id = '') => ADMIN_URL.root(`/products/${id}`),

   variant: (variantId: string) => ADMIN_URL.root(`/variant/${variantId}`),
   variants: (productId: string) =>
      ADMIN_URL.root(`/products/${productId}/variants`),
   variantCreate: (productId: string) =>
      ADMIN_URL.root(`/products/${productId}/variants/create`),
   variantEdit: (productId: string, variantId = '') =>
      ADMIN_URL.root(`/products/${productId}/variants/${variantId}`),

   colors: () => ADMIN_URL.root(`/colors`),
   colorCreate: () => ADMIN_URL.root(`/colors/create`),
   colorEdit: (id = '') => ADMIN_URL.root(`/colors/${id}`),

   attributes: () => ADMIN_URL.root(`/attributes`),
   attributeCreate: () => ADMIN_URL.root(`/attributes/create`),
   attributeEdit: (id = '') => ADMIN_URL.root(`/attributes/${id}`),

   deliveries: () => ADMIN_URL.root('/deliveries'),
   deliveryCreate: () => ADMIN_URL.root('/deliveries/create'),
   deliveryEdit: (id = '') => ADMIN_URL.root(`/deliveries/${id}`),

   payments: () => ADMIN_URL.root('/payments'),
   paymentCreate: () => ADMIN_URL.root('/payments/create'),
   paymentEdit: (id = '') => ADMIN_URL.root(`/payments/${id}`),

   reviews: () => ADMIN_URL.root('/reviews'),

   orders: () => ADMIN_URL.root('/orders'),
   orderInfo: (id = '') => ADMIN_URL.root(`/orders/${id}`),
};
