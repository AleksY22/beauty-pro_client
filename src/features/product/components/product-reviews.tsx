import { IProduct } from '../types/product.interface';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import { ConfirmModal } from '@/shared/components/confirm-modal';
import { useProfile } from '@/shared/hooks/useProfile';

import { ReviewModal } from '@/features/review/components/review-modal';
import { useDeleteReviews } from '@/features/review/hooks/useDeleteReview';

interface ProductReviewsProps {
   product: IProduct;
}

export function ProductReviews({ product }: ProductReviewsProps) {
   const { user } = useProfile();

   const { deleteReview } = useDeleteReviews();

   return (
      <div className="max-w-360 mx-auto px-4 mb-18.75">
         <div className="flex justify-between items-center">
            <h2 className="text-[26px] md:text-[36px] font-bold text-red-300">
               Отзывы
            </h2>
            {user && (
               <div className="m-6">
                  <ReviewModal>
                     <div className="flex items-center border px-3 py-1 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/80 transition">
                        <Plus className="size-4" />
                        Добавить отзыв
                     </div>
                  </ReviewModal>
               </div>
            )}
         </div>
         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
            {product.reviews.length ? (
               product.reviews.map((review) => (
                  <div className="border rounded-lg p-4" key={review.id}>
                     <div className="flex justify-between">
                        <div className="flex items-center gap-x-4 font-medium">
                           <Image
                              src={review.user.picture}
                              alt={review.user.displayName}
                              width={40}
                              height={40}
                              className="rounded-full"
                              loading="lazy"
                           />
                           {review.user.displayName}
                        </div>
                        {review.user?.id === user?.id && (
                           <ConfirmModal
                              handleClick={() => deleteReview(review.id)}
                           >
                              <button className="-mt-3 text-red-500">
                                 <Trash className="size-5" />
                              </button>
                           </ConfirmModal>
                        )}
                     </div>
                     <Rating
                        readonly
                        initialValue={review.rating}
                        SVGstyle={{ display: 'inline-block' }}
                        size={18}
                        allowFraction
                        transition
                     />
                     <div className="text-sm text-muted-foreground mt-1">
                        {review.text}
                     </div>
                  </div>
               ))
            ) : (
               <div className="mt-4">У этого товара пока нет отзывов</div>
            )}
         </div>
      </div>
   );
}
